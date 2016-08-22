cmake_minimum_required(VERSION 3.2)

set(PROJECT_NAME_STR beacon-face)
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
OPTION(USE_OMP        "Set to ON to use OMP"             OFF)
OPTION(USE_SSE        "Set to ON to use sse"             ON)
OPTION(USE_AVX        "Set to ON to use avx"             ON)
OPTION(USE_OPENCV     "Set to ON to use OpenCV"          ON)
OPTION(UNIT_TEST      "UnitTest by GoogleTest"           ON)

IF(USE_OPENCV)
    find_package( OpenCV REQUIRED )
ENDIF()

IF(USE_TBB)
    find_package(TBB REQUIRED)
    add_definitions(-DCNN_USE_TBB)
    include_directories(${TBB_INCLUDE_DIRS})
    link_directories(${TBB_LIBRARY_DIRS})
    SET(REQUIRED_LIBRARIES  ${REQUIRED_LIBRARIES} ${TBB_LIBRARIES}  )
ELSEIF(USE_OMP)
    find_package(OpenMP  REQUIRED)
    set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${OpenMP_C_FLAGS}")
    set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${OpenMP_CXX_FLAGS}")
    add_definitions( -DCNN_USE_OMP)
ENDIF()

IF((NOT USE_TBB) AND (NOT USE_OMP))
    SET(EXTRA_C_FLAGS " ${EXTRA_C_FLAGS} -pthread ")
ENDIF()
SET(EXTRA_C_FLAGS " ${EXTRA_C_FLAGS} -std=c++11 -Wall -Wpedantic -lgtest")
SET(EXTRA_C_FLAGS_RELEASE " -O3 ")
SET(EXTRA_C_FLAGS_DEBUG " -g3 ")

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${EXTRA_C_FLAGS}")
SET(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} ${EXTRA_C_FLAGS_RELEASE}")
SET(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} ${EXTRA_C_FLAGS_DEBUG}")
SET(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${EXTRA_EXE_LINKER_FLAGS}")
SET(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS_RELEASE} ${EXTRA_EXE_LINKER_FLAGS_RELEASE}")
SET(CMAKE_EXE_LINKER_FLAGS_DEBUG "${CMAKE_EXE_LINKER_FLAGS_DEBUG} ${EXTRA_EXE_LINKER_FLAGS_DEBUG}")


SET(TINY_CNN_ROOT ../tiny-cnn)

INCLUDE_DIRECTORIES(${TINY_CNN_ROOT})

#-------------------
# set common include folder for module
#-------------------
set(COMMON_INCLUDES ${PROJECT_SOURCE_DIR}/common)
set(TEST_INCLUDES ${PROJECT_SOURCE_DIR}/test)
set(COTS_PROJECTS_DIR ${PROJECT_SOURCE_DIR}/cots)

add_subdirectory(${COTS_PROJECTS_DIR}/gtest)
add_subdirectory(${COTS_PROJECTS_DIR}/mnisten)
enable_testing()

#------------------------------------------------
# TARGETS
#------------------------------------------------
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR} ${COMMON_INCLUDES})
LINK_LIBRARIES(${REQUIRED_LIBRARIES} )

#------------------------------------------------------
# Boost Lib Names and Dirs
#------------------------------------------------------
set(Boost_USE_STATIC_LIBS OFF) 
set(Boost_USE_MULTITHREADED ON)  
set(Boost_USE_STATIC_RUNTIME OFF) 
find_package(Boost 1.55.0 COMPONENTS filesystem system program_options regex) 

SET( BEACON_UNIT_TEST  ${PROJECT_NAME_STR}_test)

file(GLOB SRC_FILES        ${PROJECT_SOURCE_DIR}/src/*.cpp)
file(GLOB TEST_SRC_FILES   ${PROJECT_SOURCE_DIR}/test/*.cpp)
file(GLOB COMMON_SRC_FILES ${PROJECT_SOURCE_DIR}/common/*.cpp)

add_executable(beacon_train ${SRC_FILES} ${COMMON_SRC_FILES}) 

message(STATUS "Google Test libs is located @${GTEST_LIBS_DIR}")

if(UNIT_TEST)
  add_executable(${BEACON_UNIT_TEST} ${TEST_SRC_FILES} ${COMMON_SRC_FILES})
  add_dependencies(${BEACON_UNIT_TEST} googletest)

  #target_link_libraries(${BEACON_UNIT_TEST}
  #        pthread
  #        ${GTEST_LIBS_DIR}/libgtest.a
  #        ${GTEST_LIBS_DIR}/libgtest_main.a
  #        )
endif()

if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS}) 
    target_link_libraries(beacon_train ${Boost_LIBRARIES})
    target_link_libraries(${BEACON_UNIT_TEST} ${Boost_LIBRARIES})
endif()

target_link_libraries(${BEACON_UNIT_TEST}
    pthread
    gtest
    ${CMAKE_THREAD_LIBS_INIT})

#add_test(test1 ${BEACON_UNIT_TEST})

IF (USE_OPENCV)
    target_link_libraries( beacon_train ${OpenCV_LIBS} )
    target_link_libraries( ${BEACON_UNIT_TEST} ${OpenCV_LIBS} )
ENDIF()
