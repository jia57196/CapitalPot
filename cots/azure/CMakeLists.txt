cmake_minimum_required(VERSION 3.2)
project(azure_builder C CXX)
include(ExternalProject)

ExternalProject_Add(azure-storage-cpp
    GIT_REPOSITORY https://github.com/Azure/azure-storage-cpp.git
    CMAKE_ARGS -DCMAKE_ARCHIVE_OUTPUT_DIRECTORY_DEBUG:PATH=DebugLibs
               -DCMAKE_ARCHIVE_OUTPUT_DIRECTORY_RELEASE:PATH=ReleaseLibs
               -DCMAKE_CXX_FLAGS=${MSVC_COMPILER_DEFS}
               -Dgtest_force_shared_crt=ON
               -DCMAKE_BUILD_TYPE=Release
               -DCASABLANCA_DIR=/tmp/casablanca
     PREFIX "${CMAKE_CURRENT_BINARY_DIR}"
# Disable install step
    INSTALL_COMMAND ""
)

# Specify include dir
ExternalProject_Get_Property(azure-storage-cpp source_dir)
set(AZURE_INCLUDE_DIRS ${source_dir}/Microsoft.WindowsAzure.Storage/includes PARENT_SCOPE)

# Specify MainTest's link libraries
ExternalProject_Get_Property(azure-storage-cpp binary_dir)
set(AZURE_LIBS_DIR ${binary_dir}/Microsoft.WindowsAzure.Storage/build.release/Binaries PARENT_SCOPE)
