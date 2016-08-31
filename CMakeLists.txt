cmake_minimum_required(VERSION 3.2)

set(PROJECT_NAME_STR penny_backend)
project(${PROJECT_NAME_STR} C CXX)

# ----------------------------------------------------------------------------
#   make the build folder, and cd build $$ cmake everything...
# ----------------------------------------------------------------------------
#set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/Modules")
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


add_subdirectory(${COTS_PROJECTS_DIR}/gtest)
enable_testing()

#------------------------------------------------
# TARGETS
#------------------------------------------------
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR} ${COMMON_INCLUDES} ${MUDUO_DIR})
LINK_LIBRARIES(${REQUIRED_LIBRARIES} )

#------------------------------------------------------
# Boost Lib Names and Dirs
#------------------------------------------------------
set(Boost_USE_STATIC_LIBS OFF) 
set(Boost_USE_MULTITHREADED ON)  
set(Boost_USE_STATIC_RUNTIME OFF) 
find_package(Boost 1.55.0 COMPONENTS filesystem system program_options regex) 

file(GLOB MATCH_ENGINE_FILES        ${PROJECT_SOURCE_DIR}/src/matching_engine/*.cpp)
file(GLOB TEST_SRC_FILES            ${PROJECT_SOURCE_DIR}/test/*.cpp)

add_executable(matching_engine ${MATCH_ENGINE_FILES}) 

message(STATUS "Google Test libs is located @${GTEST_LIBS_DIR}")

if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS}) 
    target_link_libraries(matching_engine ${Boost_LIBRARIES})
endif()

target_link_libraries(matching_engine
    pthread
    ${CMAKE_THREAD_LIBS_INIT})


