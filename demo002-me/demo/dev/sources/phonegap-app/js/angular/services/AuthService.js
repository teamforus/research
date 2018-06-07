module.exports = [
    '$q',
    'ApiRequest',
    'CredentialsService',
    function(
        $q,
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            this.register = function(data) {
                return ApiRequest.post('/identity', data);
            };

            this.signOut = function(values) {
                CredentialsService.delete(CredentialsService.get());
                CredentialsService.set(null);
            };

            this.getUser = function() {
                return ApiRequest.get('/identity');
            };

            this.records = function() {
                return ApiRequest.get('/identity/records');
            };

            this.tokens = function() {
                return ApiRequest.get('/identity/wallet/tokens');
            };

            this.assets = () => {
                return ApiRequest.get('/identity/wallet/assets');
            };

            this.vouchers = () => {
                return ApiRequest.get('/identity/wallet/vouchers');
            };

            this.updateAsset = (id, values) => {
                return ApiRequest.patch('/identity/wallet/assets/' + id, values);
            };

            this.qrDetails = function(token) {
                return ApiRequest.get('/qr-code', token);
            };

            this.validateRecord = function(id) {
                return ApiRequest.post('/identity/records/validate/' + id);
            };

            this.makeAuthToken = () => {
                return ApiRequest.post('/identity/proxy/token');
            };

            this.makeAuthCode = () => {
                return ApiRequest.post('/identity/proxy/code');
            };

            this.makeAuthEmailToken = (source, email) => {
                return ApiRequest.post('/identity/proxy/email', {
                    source: source,
                    email: email
                });
            };

            this.authorizeAuthToken = (auth_token) => {
                return ApiRequest.post('/identity/proxy/authorize/token', {
                    auth_token: auth_token
                });
            };

            this.authorizeAuthCode = (code) => {
                return ApiRequest.post('/identity/proxy/authorize/code', {
                    auth_code: code
                });
            };

            this.authorizeAuthEmailToken = (source, email_token) => {
                return ApiRequest.get('/identity/proxy/authorize/email/' + source + '/' + email_token);
            };

            this.checkAccessToken = (access_token) => {
                return ApiRequest.get('/identity/status', {}, {
                    'Authorization': 'Bearer ' + access_token
                }, false);
            };

            this.setPinCode = function(pin_code, old_pin_code) {
                return ApiRequest.post('/identity/pin-code', {
                    pin_code: pin_code,
                    old_pin_code: old_pin_code,
                });
            };

            this.checkPinCode = function (pin_code, old_pin_code) {
                return ApiRequest.get('/identity/pin-code/' + pin_code);
            };

            this.getName = () => {
                return $q((resolve, reject) => {
                    this.records().then((res) => {
                        try {
                            name = res.data.filter((record) => {
                                return record.key == 'first_name';
                            })[0].value + " " + res.data.filter((record) => {
                                return record.key == 'last_name';
                            })[0].value;
                        } catch (error) {
                            name = res.data.filter((record) => {
                                return record.key == 'name';
                            })[0].value;
                        }

                        resolve(name);
                    }, reject)
                });
            }

            this.tokenOverview = (tokenId) => {
                return ApiRequest.get('/identity/wallet/tokens/overview/' + tokenId);
            };

            this.voucherOverview = (voucherId) => {
                return $q(function(resolve, reject) {
                    return ApiRequest.get('/identity/wallet/vouchers/overview/' + voucherId).then((res) => {
                        res.data.transactions = [
                            {
                                "id": 1,
                                "token_id": 1,
                                "from_wallet_id": 2,
                                "to_wallet_id": 3,
                                "amount": 15,
                                "state": "success",
                                "created_at": "2018-06-01 00:45:15",
                                "updated_at": "2018-06-01 00:45:15",
                                "dir": "in",
                                "counterpart": "Gemeente Zuidhorn",
                                "pretty_date": "Jun 01, 2018 00:45",
                                "from_wallet": {
                                    "id": 2,
                                    "identity_id": 2,
                                    "created_at": "2018-06-01 00:21:35",
                                    "updated_at": "2018-06-01 00:21:35",
                                    "identity": {
                                        "id": 2,
                                        "pin_code": "$2y$10$NxVNosg706VVydGq\/YRX4.zuZJlvIrfTfc8hEQ5DIX1ecPZx4iobS",
                                        "type": "organisation",
                                        "address": "0xcc79555495ebcc1a5ee479b32b351902faf7d65b",
                                        "stem_points": 2,
                                        "created_at": "2018-06-01 00:21:35",
                                        "updated_at": "2018-06-01 00:21:35"
                                    }
                                }
                            },
                            {
                                "id": 2,
                                "token_id": 1,
                                "from_wallet_id": 2,
                                "to_wallet_id": 3,
                                "amount": 23,
                                "state": "success",
                                "created_at": "2018-06-01 00:45:48",
                                "updated_at": "2018-06-01 00:45:48",
                                "dir": "in",
                                "counterpart": "Gemeente Zuidhorn",
                                "pretty_date": "Jun 01, 2018 00:45",
                                "from_wallet": {
                                    "id": 2,
                                    "identity_id": 2,
                                    "created_at": "2018-06-01 00:21:35",
                                    "updated_at": "2018-06-01 00:21:35",
                                    "identity": {
                                        "id": 2,
                                        "pin_code": "$2y$10$NxVNosg706VVydGq\/YRX4.zuZJlvIrfTfc8hEQ5DIX1ecPZx4iobS",
                                        "type": "organisation",
                                        "address": "0xcc79555495ebcc1a5ee479b32b351902faf7d65b",
                                        "stem_points": 2,
                                        "created_at": "2018-06-01 00:21:35",
                                        "updated_at": "2018-06-01 00:21:35"
                                    }
                                }
                            },
                            {
                                "id": 3,
                                "token_id": 1,
                                "from_wallet_id": 3,
                                "to_wallet_id": 4,
                                "amount": 15,
                                "state": "success",
                                "created_at": "2018-06-01 00:48:34",
                                "updated_at": "2018-06-01 00:48:34",
                                "dir": "out",
                                "counterpart": "Jamal Vleij",
                                "pretty_date": "Jun 01, 2018 00:48",
                                "to_wallet": {
                                    "id": 4,
                                    "identity_id": 4,
                                    "created_at": "2018-06-01 00:48:18",
                                    "updated_at": "2018-06-01 00:48:18",
                                    "identity": {
                                        "id": 4,
                                        "pin_code": "$2y$10$XVG2555XbddGTxtZY0yLMOZBK1y6mnXrvOd1AF2X15UB2CoPaB19W",
                                        "type": "personal",
                                        "address": "0x422db341495af6b54e950ef42e7365b6c01c4bec",
                                        "stem_points": 2,
                                        "created_at": "2018-06-01 00:48:18",
                                        "updated_at": "2018-06-01 00:48:22"
                                    }
                                }
                            }
                        ];

                        resolve(res);
                    }, reject)
                    resolve();
                });
            };

            this.splitVoucher = (voucherId, data) => {
                return ApiRequest.post('/identity/wallet/vouchers/split/' + voucherId, data);
            };
        });
    }
];