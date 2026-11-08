#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { EshopStorageStack } from '../lib/storage-stack';
import { EshopAuthStack } from '../lib/auth-stack';
import { EshopDatabaseStack } from '../lib/database-stack';
import { EshopAmplifyStack } from '../lib/amplify-stack';

const app = new cdk.App();

const env = {
  account: '237725356452',
  region: 'ap-southeast-1',
};

const storageStack = new EshopStorageStack(app, 'EshopStorageStack', { env });
const authStack = new EshopAuthStack(app, 'EshopAuthStack', { env });
const databaseStack = new EshopDatabaseStack(app, 'EshopDatabaseStack', { env });

new EshopAmplifyStack(app, 'EshopAmplifyStack', {
  env,
  userPoolId: authStack.userPool.userPoolId,
  userPoolClientId: authStack.userPoolClient.userPoolClientId,
  dbSecretArn: databaseStack.dbSecretArn,
  imagesBucketUrl: storageStack.imagesBucketUrl,
});
