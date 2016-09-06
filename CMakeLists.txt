cmake_minimum_required(VERSION 3.2)

set(PROJECT_NAME_STR penny_backend)
project(${PROJECT_NAME_STR} C CXX)

# Global settings
set(GLOBAL_OUTPUT_PATH ${PROJECT_BINARY_DIR}/bin)
set(CMAKE_INSTALL_PREFIX ${PROJECT_BINARY_DIR}/install)

# Sets global output directory for single configuration (GCC)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${GLOBAL_OUTPUT_PATH})

# ----------------------------------------------------------------------------
#   make the build folder, and cd build $$ cmake everything...
# ----------------------------------------------------------------------------
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}")

# ----------------------------------------------------------------------------
#   Basic Configuration
# ----------------------------------------------------------------------------
set(PROJECT_VERSION "0.1.0")

#--- thread -----
find_package(Threads REQUIRED)

#------------------------------------------------------
# Lib Names and Dirs
#------------------------------------------------------
OPTION(USE_TBB        "Set to ON to use TBB"             ON)
OPTION(UNIT_TEST      "UnitTest by GoogleTest"           ON)

IF(USE_TBB)
    find_package(TBB REQUIRED)
    add_definitions(-DCNN_USE_TBB)
    include_directories(${TBB_INCLUDE_DIRS})
    link_directories(${TBB_LIBRARY_DIRS})
    SET(REQUIRED_LIBRARIES  ${REQUIRED_LIBRARIES} ${TBB_LIBRARIES}  )
ENDIF()

IF(NOT USE_TBB)
    SET(EXTRA_C_FLAGS " ${EXTRA_C_FLAGS} -pthread ")
ENDIF()
SET(EXTRA_C_FLAGS " ${EXTRA_C_FLAGS} -std=c++11 -Wall -Wpedantic")
SET(EXTRA_C_FLAGS_RELEASE " -O3 ")
SET(EXTRA_C_FLAGS_DEBUG " -g3 ")

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${EXTRA_C_FLAGS}")
SET(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} ${EXTRA_C_FLAGS_RELEASE}")
SET(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} ${EXTRA_C_FLAGS_DEBUG}")
SET(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${EXTRA_EXE_LINKER_FLAGS}")
SET(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS_RELEASE} ${EXTRA_EXE_LINKER_FLAGS_RELEASE}")
SET(CMAKE_EXE_LINKER_FLAGS_DEBUG "${CMAKE_EXE_LINKER_FLAGS_DEBUG} ${EXTRA_EXE_LINKER_FLAGS_DEBUG}")

#-------------------
# set common include folder for module
#-------------------
set(COMMON_INCLUDES ${PROJECT_SOURCE_DIR}/common)
set(TEST_INCLUDES ${PROJECT_SOURCE_DIR}/test)
set(COTS_PROJECTS_DIR ${PROJECT_SOURCE_DIR}/cots)
set(MUDUO_DIR ${PROJECT_SOURCE_DIR}/cots/muduo)
set(JSONCPP_DIR ${PROJECT_SOURCE_DIR}/cots/jsoncpp)
SET(LDFLAGS "/usr/local/ssl/lib")

add_subdirectory(${PROJECT_SOURCE_DIR}/src/matching_engine)
add_subdirectory(${COTS_PROJECTS_DIR}/gtest)
add_subdirectory(${COTS_PROJECTS_DIR}/log)
#add_subdirectory(${COTS_PROJECTS_DIR}/azure)

include(${COTS_PROJECTS_DIR}/azure/CMakeLists.txt)


#------------------------------------------------
# TARGETS
#------------------------------------------------
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR} ${COMMON_INCLUDES} ${MUDUO_DIR} ${JSONCPP_DIR} ${AZURE_INCLUDE_DIR})
LINK_LIBRARIES(${REQUIRED_LIBRARIES} )

#------------------------------------------------
# find libs 
#------------------------------------------------


find_library(CAS_LIBS
             NAMES cpprest
             HINTS "user/lib")


file(GLOB MATCH_ENGINE_FILES        ${PROJECT_SOURCE_DIR}/src/matching_engine/*.cpp)
file(GLOB TEST_SRC_FILES            ${PROJECT_SOURCE_DIR}/test/*.cpp)

add_executable(matching_engine ${MATCH_ENGINE_FILES}) 

message(STATUS "Google Test libs is located @${GTEST_LIBS_DIR}")

# Search OpenSSL
find_package(PkgConfig REQUIRED)
pkg_search_module(OPENSSL REQUIRED openssl)

if( OPENSSL_FOUND )
    include_directories(${OPENSSL_INCLUDE_DIRS})
    message(STATUS "Using OpenSSL ${OPENSSL_VERSION}")
else()
    # Error; with REQUIRED, pkg_search_module() will throw an error by it's own
endif()

# Global link directories
link_directories(${GLOBAL_OUTPUT_PATH})


#------------------------------------------------------
# Boost Lib Names and Dirs
#------------------------------------------------------
set(Boost_USE_STATIC_LIBS ON) 
set(Boost_USE_MULTITHREADED ON)  
set(Boost_USE_STATIC_RUNTIME ON) 
find_package(Boost 1.58.0 REQUIRED COMPONENTS filesystem system program_options regex) 

if (Boost_FOUND)
  # From the offical documentation:
  # Add include directories to the build. [...] If the SYSTEM option is given,
  # the compiler will be told the directories are meant as system include
  # directories on some platforms (signalling this setting might achieve effects
  # such as the compiler skipping warnings [...])."
  include_directories (SYSTEM ${Boost_INCLUDE_DIR})

  # From the offical documentation:
  # "Specify directories in which the linker will look for libraries. [...] Note
  # that this command is rarely necessary. Library locations returned by
  # find_package() and find_library() are absolute paths. Pass these absolute
  # library file paths directly to the target_link_libraries() command. CMake
  # will ensure the linker finds them."
  #link_directories (${Boost_LIBRARY_DIRS})
  message(STATUS "Boost libs are lcoated !")
  include_directories(${Boost_INCLUDE_DIRS}) 
  target_link_libraries(matching_engine ${Boost_LIBRARIES})
endif ()

find_library(AZURE_LIBS 
             NAMES azurestorage
             PATHS "${GLOBAL_OUTPUT_PATH}" 
             PATH_SUFFIXES "lib"
             NO_DEFAULT_PATH)

if (NOT AZURE_LIBS) 
  message (STATUS "AZURE libs = ${AZURE_LIBS}")
endif ()



target_link_libraries(matching_engine
    pthread
    #${AZURE_LIBS}
    ${OPENSSL_LIBRARIES}
    ${CAS_LIBS} 
    ${CMAKE_THREAD_LIBS_INIT})

