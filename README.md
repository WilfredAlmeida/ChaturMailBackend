# email-generator-backend

You need .env and config/serviceAccountKey.json to run

docker run --name email-generator-node-container --env-file ./.env -p 4545:4545 -v email-generator-node-volume:/email_generator_node --net email-gen-network email-generator-node-image

docker run --name email-generator-node-container --env-file ./.env -p 4545:4545 --net email-gen-network email-generator-node-image

docker run --name email-generator-node-container --env-file ./.env-docker -p 4545:4545 --net email-gen-network email-generator-node-image

docker run -itd --name redis-server -p 6379:6379 --net email-gen-network --ip 172.18.0.2 -v email-generator-redis-volume:/data redis