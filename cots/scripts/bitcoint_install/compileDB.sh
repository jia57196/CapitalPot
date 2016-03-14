
cd src
tar -xvf db-4.8.30.NC.tar.gz
cd db-4.8.30.NC/build_unix
mkdir -p build
BDB_PREFIX=$(pwd)/build

echo "DB path is:$BDB_PREFIX";

../dist/configure --disable-shared --enable-cxx --with-pic --prefix=$BDB_PREFIX
make install
cd ../..

