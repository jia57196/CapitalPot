'use strict'

angular.module('ionicApp.services')

// This is a hack for having cleaner configuration
.factory('Config', function() {
  var copay = require('copay');

  var config = {};

  // TODO: This should be a Profile preference
  config.savePreferences = function() {
    config.pluginManager = new copay.PluginManager(config);
    config.identity.pluginManager = config.pluginManager;
    localStorage.setItem('preferences', JSON.stringify(config));
  };

  config.loadPreferences = function() {
    var readConfig = localStorage.getItem('preferences');
    return _.extend(config, JSON.parse(readConfig));
  };

  config.currency = {btc: "BTC", fiat: "USD"};
  config.useRemote = true;

  config.EncryptedInsightStorage = {
    url: 'https://insight.bitpay.com:443/api/email',
  };

  //https://test-insight.bitpay.com:443
  config.network = {
    testnet: {
      url: 'http://192.168.164.145:3001/insight/',
      transports: ['polling']
    },
    livenet: {
      url: 'http://192.168.164.145:3001/insight/',
      transports: ['polling']
    }
  };

  config.rates = {
    url: 'https://bitpay.com/api/rates',
    updateFrequencySeconds: 60 * 60
  };

  config.plugins = { EncryptedInsightStorage: true };

  var walletConfig = {
    idleDurationMin: 4,
    reconnectDelay: 5000,
    totalCopayers: 3,
    requiredCopayers: 2,
    spendUnconfirmed: true,
    settings: {
      alternativeIsoCode: "USD",
      alternativeName: "US Dollar",
      unitDecimals: 2,
      unitName: "bits",
      unitToSatoshi: 100,
    }
  };

  config.loadPreferences();
  config.pluginManager = new copay.PluginManager(config);

  config.identity = {
    pluginManager: config.pluginManager,
    network: config.network,
    networkName: "livenet",
    walletDefaults: walletConfig,
    passphraseConfig: {
      iterations: 100,
      storageSalt: "mjuBtGybi/4="
    }
  };
  return config;
});
