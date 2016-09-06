include(ExternalProject)

# Builds external third party projects.
# The parent script needs to define the "GLOBAL_OUTPUT_PATH" variable,
# which will be used as output directory for all *.lib, *.dll, *.a, *.so, *.pdb files.

###############################################################################
# HumbleLogging
###############################################################################

ExternalProject_Add(
  HumbleLogging

  GIT_REPOSITORY "https://github.com/mfreiholz/humble-logging-library.git"
  GIT_TAG "master"
  
  UPDATE_COMMAND ""
  PATCH_COMMAND ""
  PREFIX "${CMAKE_CURRENT_BINARY_DIR}"
  
  CMAKE_ARGS -DBuildShared=ON -DBuildExamples=OFF -DCMAKE_INSTALL_PREFIX=${GLOBAL_OUTPUT_PATH}/humblelogging
  
  TEST_COMMAND ""
)
#SOURCE_DIR "${CMAKE_SOURCE_DIR}/cots/humblelogging"

ExternalProject_Add_Step(
  HumbleLogging CopyToBin
  COMMAND ${CMAKE_COMMAND} -E copy_directory ${GLOBAL_OUTPUT_PATH}/humblelogging/bin ${GLOBAL_OUTPUT_PATH}
  COMMAND ${CMAKE_COMMAND} -E copy_directory ${GLOBAL_OUTPUT_PATH}/humblelogging/lib ${GLOBAL_OUTPUT_PATH}
  DEPENDEES install
)

set(HumbleLogging_INCLUDE_DIRS "${CMAKE_SOURCE_DIR}/3rdparty/humblelogging/include")
set(HumbleLogging_LIBRARIES "${CMAKE_SHARED_LIBRARY_PREFIX}humblelogging${CMAKE_SHARED_LIBRARY_SUFFIX}")
include_directories(${HumbleLogging_INCLUDE_DIRS})


find_library(LOG_LIBS 
             NAMES humblelogging
             PATHS "${GLOBAL_OUTPUT_PATH}" 
             PATH_SUFFIXES "lib"
             NO_DEFAULT_PATH)

if (NOT LOG_LIBS) 
  message (STATUS "LOG_LIBS = ${LOG_LIBS} @ ${GLOBAL_OUTPUT_PATH}")
endif ()
