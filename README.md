

KAFKA PYTHON MANAGER
======================

This script implements a console interface for communication with the Kafka server, using secure connections with SSL

**See Apache Kafka documentation in:  https://kafka.apache.org**

SETUP
=====

 1. You need to have installed python v3.0+ and pip.

 2. Install library kafka-python:

    `pip install kafka-python`

 3. Install library JKS:

    `pip install pyjks`

 4. In examples run this command for list topics in default Broker:

    `python ManageKafka.py -l`


COMMAND LIST
==============
  1. `-l`

      Description: List of topics in the broker.

      Default value: **False**

  1. `-t <string>`

      Description: Title of the topic to create.

      Default value: **False**

  1. `-z <string>`

      Description: Zookeper host address.

      Default value: **lla-anurxzk0103.walgreens.com**

  1. `-r <number>`

      Description: Replication number.

      Default value: **3**

  1. `-p <number>`

      Description: Partition number.

      Default value: **3**

  1. `-b <string>`

      Description: Broker host address.

      Default value: **lla-anurxrp0101.walgreens.com**

  1. `-bp <number>`

      Description: Broker port address.

      Default value: **9092**

  1. `-d <string>`

      Description: Title of topic to delete.

      Default value: **None**

  1. `-s <string>`

      Description: Title of schema to delete.

      Default value: **None**

  1. `-sr <string>`

      Description: SchemaRegistry host address.

      Default value: **lla-anurxsr0101.walgreens.com**

  1. `-ls <string>`

      Description: List of SchemaRegistry.

      Default value: **False**

  1. `-to <number>`

      Description: Timeout for the broker response.

      Default value: **1000**

  1. `-ck <path>`

      Description: Path to client keystore.

      Default value: **False**

  1. `-psw <string>`

      Description: Client keystore password.

      Default value: **False**

COMMAND EXAMPLE
================

  1. List topics in the default broker

     `python ManageKafka.py -l`

  1. List topics in the custom address broker

     `python ManageKafka.py -l -b 10.10.10.10`

  1. List schema in the default schemaregistry

     `python ManageKafka.py -ls`

  1. List schema in the custom schemaregistry

     `python ManageKafka.py -ls -sr 10.10.10.10`

  1. Create topic in the default broker in replication number 1 and partition number 1

     `python ManageKafka.py -t new_topic -r 1 -p 1`

  1. Create topic in the custom broker and port

     `python ManageKafka.py -t new_topic -b 10.10.10.10 -bp 9093`

  1. Create topic in the default broker with params keyfile and password

     `python ManageKafka.py -t new_topic -ck /tmp/keystore.jks -psw 123456`

  1. Delete topic in the default broker

     `python ManageKafka.py -d new_topic`

  1. Delete schema in the default broker

     `python ManageKafka.py -s schema_name`
