module.exports = ['$stateProvider', function($stateProvider) {
    $stateProvider
        .state({
            url: '/logout',
            name: 'logout',
            controller: [
                '$state',
                'CredentialsService',
                function(
                    $state,
                    CredentialsService
                ) {
                    CredentialsService.delete(CredentialsService.get());
                    CredentialsService.set(null);
                    $state.go('welcome');
                }
            ]
        })
        .state({
            url: '/',
            name: 'welcome',
            component: 'welcomeComponent',
            data: {
                header: false
            }
        })
        .state({
            url: '/auth',
            name: 'auth',
            component: 'authComponent',
            data: {
                header: false
            }
        })
        .state({
            url: '/auth-register',
            name: 'auth-register',
            component: 'authRegisterComponent',
            data: {
                layout: {
                    footer_size: 2 
                },
                header: {
                    title: "Nieuw profiel",
                    subtitle: "Vul uw gegevens in",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "auth"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/auth-pending',
            name: 'auth-pending',
            component: 'authPendingComponent',
            data: {
                header: {
                    title: "Nieuw profiel",
                    subtitle: "Vul uw gegevens in",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "auth"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/auth-register-pincode',
            name: 'auth-register-pincode',
            component: 'authRegisterPinCodeComponent',
            data: {
                header: {
                    title: "PIN instellen",
                    subtitle: "Maak een 4 cijferige pincode aan",
                    pincode: true,
                    navbar: {
                        text: "",
                        left: false,
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/auth-restore',
            name: 'auth-restore',
            component: 'authRestoreComponent',
            data: {
                layout: {
                    footer_size: 2
                },
                header: {
                    title: "Aanmelden",
                    pad_lg: true,
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "auth"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/info',
            name: 'info',
            component: 'infoComponent',
            data: {
                header: {
                    title: "Info",
                    subtitle: "Lorem ipsum dolor sit amet, consectetur",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "auth"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/info-delegates',
            name: 'info-delegates',
            component: 'infoDelegatesComponent',
            data: {
                header: {
                    title: "Info delegates",
                    subtitle: "Lorem ipsum dolor sit amet, consectetur",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "delegates"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/delegates',
            name: 'delegates',
            component: 'delegatesComponent',
            data: {
                header: {
                    title: "Delegates",
                    subtitle: "Assign delegates you trust for you identity",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "auth-register"
                        },
                        right: false
                    },
                    pad: true
                }
            }
        })
        .state({
            url: '/wallet-tokens',
            name: 'wallet-tokens',
            component: 'walletTokensComponent',
            data: {
                header: {
                    title: "Eigendom",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Valuta",
                        assets: "Bezit",
                        vouchers: "Vouchers"
                    },
                    tab_active: "tokens",
                    search: true,
                    search_text: 'Zoek valuta'
                }
            }
        })
        .state({
            url: '/wallet-token-view/:tokenId',
            name: 'wallet-token-view',
            component: 'walletTokenViewComponent',
            data: {
                header: {
                    title: "",
                    subtitle: "",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-logout-variant",
                            sref: "logout"
                        }
                    },
                    search: true,
                    search_text: 'Zoek transacties',
                    sendAndAsk: {
                        tokenId: null,
                    }
                }
            }
        })
        .state({
            url: '/wallet-assets',
            name: 'wallet-assets',
            component: 'walletAssetsComponent',
            data: {
                header: {
                    title: "Eigendom",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Valuta",
                        assets: "Bezit",
                        vouchers: "Vouchers"
                    },
                    tab_active: "assets",
                    search: true,
                    search_text: 'Zoek bezit'
                }
            }
        })
        .state({
            url: '/wallet-asset-view/:assetId',
            name: 'wallet-asset-view',
            component: 'walletAssetViewComponent',
            data: {
                header: {
                    title: "Kantoor",
                    subtitle: "Hier kunt u uw bezittingen bewerken",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-logout-variant",
                            sref: "logout"
                        }
                    },
                    circleIcon: "assets/img/icon-real-estate.png"
                }
            }
        })
        .state({
            url: '/wallet-vouchers',
            name: 'wallet-vouchers',
            component: 'walletVouchersComponent',
            data: {
                header: {
                    title: "Eigendom",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Valuta",
                        assets: "Bezit",
                        vouchers: "Vouchers"
                    },
                    tab_active: "vouchers",
                    search: true,
                    search_text: 'Zoek vouchers'
                }
            }
        })
        .state({
            url: '/wallet-voucher-view/:voucherId',
            name: 'wallet-voucher-view',
            component: 'walletVoucherViewComponent',
            data: {
                header: {
                    title: " ",
                    subtitle: "Voucher",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-logout-variant",
                            sref: "logout"
                        }
                    },
                    search: true,
                    search_text: 'Zoek transactions'
                }
            }
        })
        .state({
            url: '/records',
            name: 'records',
            component: 'recordsComponent',
            data: {
                header: {
                    title: "EIGENSCHAPPEN",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false
                }
            }
        })
        .state({
            url: '/profile',
            name: 'profile',
            component: 'profileComponent',
            data: {
                header: {
                    title: "QR-Code",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-logout-variant",
                            sref: "logout"
                        }
                    },
                    pad_lg: true
                }
            }
        })
        .state({
            url: '/share-data',
            name: 'share-data',
            component: 'shareDataComponent',
            data: {
                header: {
                    title: "Login",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-account-outline",
                            sref: "profile"
                        }
                    }
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/share-data-stempas',
            name: 'share-data-stempas',
            component: 'shareDataStempasComponent',
            data: {
                header: {
                    title: "StemAPP",
                    subtitle: "Share your voting pass",
                    navbar: false
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/validators',
            name: 'validators',
            component: 'validatorsComponent',
            data: {
                header: {
                    title: "",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "records"
                        },
                        right: {
                            class: "mdi mdi-account-outline",
                            sref: "profile"
                        }
                    }
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/validator-digid',
            name: 'validator-digid',
            component: 'validatorDigIdComponent',
            data: {},
            params: {
                data: null
            }
        })
        .state({
            url: '/validator-zuidhorn',
            name: 'validator-zuidhorn',
            component: 'validatorZuidhornComponent',
            data: {
                header: {
                    title: "Gemeente Zuidhorn",
                    subtitle: " "
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/validator-zuidhorn-confirm',
            name: 'validator-zuidhorn-confirm',
            component: 'validatorZuidhornConfirmComponent',
            data: {
                header: {
                    title: "Validate verzoek",
                    subtitle: "Eigenschappen die wachten op validatie"
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/ask',
            name: 'ask',
            component: 'askComponent',
            data: {
                header: {
                    title: "Opvragen",
                    subtitle: "Vul de gegevens van uw aanvraag in",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "wallet-tokens"
                        },
                        right: false
                    }
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/ask-qr-code',
            name: 'ask-qr-code',
            component: 'askQrCodeComponent',
            data: {
                header: {
                    title: "Payment request",
                    subtitle: "Fill in details of your request",
                    pad_lg: true,
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "ask"
                        },
                        right: false
                    }
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/send',
            name: 'send',
            component: 'sendComponent',
            data: {
                header: {
                    title: "Versturen",
                    subtitle: "Vul de gegevens van uw betaling in",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "wallet-tokens"
                        },
                        right: false
                    }
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/send-address',
            name: 'send-address',
            component: 'sendAddressComponent',
            data: {
                header: {
                    title: "Send",
                    subtitle: "Fill in the destination address.",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "send"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/payment-confirmation',
            name: 'payment-confirmation',
            component: 'paymentConfirmationComponent',
            data: {
                header: {
                    title: "Payment",
                    subtitle: "Lorem ipsum dolor sit amet, consectetur.",
                    navbar: {
                        text: "",
                        left: {
                            class: "mdi mdi-arrow-left",
                            sref: "wallet"
                        },
                        right: false
                    }
                }
            }
        })
        .state({
            url: '/qr-scanner',
            name: 'qr-scanner',
            component: 'qrScannerComponent',
            data: {
                header: {
                    title: "QR-Scanner",
                    subtitle: "Please scan a public key or login QRCode.",
                }
            }
        })
        .state({
            url: '/qr-scanner-send',
            name: 'qr-scanner-send',
            component: 'qrScannerSendComponent',
            data: {
                header: {
                    title: "QR-Scanner",
                    subtitle: "Please scan a public key.",
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/send-confirm',
            name: 'send-confirm',
            component: 'sendConfirmComponent',
            data: {
                header: {
                    title: "Confirm sending"
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/voucher-transaction',
            name: 'voucher-transaction',
            component: 'voucherTransactionComponent',
            data: {
                header: {
                    title: "Transaction",
                    subtitle: "Confirm your transaction.",
                }
            },
            params: {
                data: null
            }
        })
        .state({
            url: '/ask-transaction-confirm',
            name: 'ask-transaction-confirm',
            component: 'askTransactionConfirmComponent',
            data: {
                header: {
                    title: "Transaction",
                    subtitle: "Confirm your transaction.",
                }
            },
            params: {
                data: null
            }
        });

    if (!document.location.hash) {
        document.location.hash = '#!/';
    }
}];