cmake_minimum_required(VERSION 3.2)

set(PROJECT_NAME_STR matching_engine_lib)
project(${PROJECT_NAME_STR} C CXX)

# ----------------------------------------------------------------------------
#   make the build folder, and cd build $$ cmake everything...
# ----------------------------------------------------------------------------
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}")

SET(SRC_DIR ${PROJECT_SOURCE_DIR}/proto)
SET(DST_DIR ${PROJECT_SOURCE_DIR}/proto)

execute_process(COMMAND protoc -I=${SRC_DIR} --cpp_out=${DST_DIR} ${SRC_DIR}/ProtocolMessages.proto
                WORKING_DIRECTORY ${DST_DIR})

message(STATUS "----Google ProtoBuffer Message files are located @${DST_DIR}----")                