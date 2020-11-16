#!/usr/bin/env bash

### Become a Certificate Authority ###

# Generate private key
openssl genrsa -des3 -out localhostCA.key 2048

# Generate root certificate
openssl req -x509 -new -nodes -key localhostCA.key -sha256 -days 825 -out localhostCA.pem

### Create CA-signed certs ###

NAME=localhost # Use your own domain name

# Generate a private key
openssl genrsa -out $NAME.key 2048

# Create a certificate-signing request
openssl req -new -key $NAME.key -out $NAME.csr

# Create a config file for the extensions
>$NAME.ext cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $NAME
IP.1 = 127.0.0.1
EOF

# Create the signed certificate
openssl x509 -req -in $NAME.csr -CA localhostCA.pem -CAkey localhostCA.key -CAcreateserial -out $NAME.crt -days 825 -sha256 -extfile $NAME.ext

# verify
# openssl verify -CAfile localhostCA.pem -verify_hostname localhost localhost.crt
