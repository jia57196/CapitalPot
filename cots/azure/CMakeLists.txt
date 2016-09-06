include(ExternalProject)

set(CMAKE_CXX_FLAGS -std=c++11)

message (STATUS "AZURE global output path dir = ${GLOBAL_OUTPUT_PATH}")
message (STATUS "AZURE CMAKE_CURRENT_BINARY_DIR = ${CMAKE_CURRENT_BINARY_DIR}")

ExternalProject_Add(
  azure-storage-cpp

  GIT_REPOSITORY "https://github.com/Azure/azure-storage-cpp.git"
  GIT_TAG "master"
  
  UPDATE_COMMAND ""
  PATCH_COMMAND ""
  PREFIX "${CMAKE_CURRENT_BINARY_DIR}"

  SOURCE_DIR "${CMAKE_CURRENT_BINARY_DIR}/src/azure-storage-cpp/Microsoft.WindowsAzure.Storage"
  CMAKE_ARGS -DCMAKE_C_FLAGS=${CMAKE_C_FLAGS} 
               -DCMAKE_CXX_FLAGS=${CMAKE_CXX_FLAGS}
               -DCMAKE_BUILD_TYPE=Release
               -DCASABLANCA_DIR=/tmp/casablanca
  
  TEST_COMMAND ""
  INSTALL_COMMAND ""
)

ExternalProject_Get_Property(azure-storage-cpp source_dir)
set(AZURE_INCLUDE_DIRS "${source_dir}/includes")

ExternalProject_Get_Property(azure-storage-cpp binary_dir)
set(AZURE_LIBS_DIR "${binary_dir}/Binaries")

file(COPY ${AZURE_LIBS_DIR}/
     DESTINATION ${GLOBAL_OUTPUT_PATH} )

file(COPY ${AZURE_INCLUDE_DIRS}/
     DESTINATION ${GLOBAL_OUTPUT_PATH}/azure-storage-cpp/include )



INCLUDE_DIRECTORIES(${AZURE_INCLUDE_DIRS})

message (STATUS "AZURE AZURE_LIBS_DIR = ${AZURE_LIBS_DIR}")

