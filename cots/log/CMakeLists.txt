include(ExternalProject)

# Builds external third party projects.
# The parent script needs to define the "GLOBAL_OUTPUT_PATH" variable,
# which will be used as output directory for all *.lib, *.dll, *.a, *.so, *.pdb files.

###############################################################################
# HumbleLogging
###############################################################################

message (STATUS "CMAKE_CURRENT_BINARY_DIR=${CMAKE_CURRENT_BINARY_DIR}")

set(COTS_PATH ${COTS_PROJECTS_DIR})

ExternalProject_Add(
  HumbleLogging

  GIT_REPOSITORY "https://github.com/mfreiholz/humble-logging-library.git"
  GIT_TAG "master"
  
  UPDATE_COMMAND ""
  PATCH_COMMAND ""
  PREFIX "${CMAKE_CURRENT_BINARY_DIR}"
  
  CMAKE_ARGS -DBuildShared=ON -DBuildExamples=OFF -DCMAKE_INSTALL_PREFIX=${CMAKE_CURRENT_BINARY_DIR}/humblelogging
  
  TEST_COMMAND ""
)

ExternalProject_Get_Property(HumbleLogging source_dir)
set(HumbleLogging_INCLUDE_DIRS ${source_dir}/include)

# Specify MainTest's link libraries
ExternalProject_Get_Property(HumbleLogging binary_dir)
set(HumbleLogging_LIBRARIES ${binary_dir})

include_directories(${HumbleLogging_INCLUDE_DIRS})
message (STATUS "HumbleLogging_INCLUDE_DIRS=${HumbleLogging_INCLUDE_DIRS}")
message (STATUS "HumbleLogging_LIBRARIES=${binary_dir}")

find_library(LOG_LIBS 
             NAMES humblelogging
             PATHS "${HumbleLogging_LIBRARIES}" 
             PATH_SUFFIXES "lib"
             NO_DEFAULT_PATH)

if (NOT LOG_LIBS) 
  message (STATUS "LOG_LIBS = ${LOG_LIBS} @ ${HumbleLogging_LIBRARIES}")
endif ()
