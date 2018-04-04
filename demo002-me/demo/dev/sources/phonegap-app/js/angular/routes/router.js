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
                    CredentialsService.set(null);
                    $state.go('auth');
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
                header: {
                    title: "New profile",
                    subtitle: "Fill in your first identity records",
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
            url: '/auth-restore',
            name: 'auth-restore',
            component: 'authRestoreComponent',
            data: {
                header: {
                    class: "view-header-dark-blue",
                    title: "Restore",
                    pad: true,
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
            url: '/wallet-tokens',
            name: 'wallet-tokens',
            component: 'walletTokensComponent',
            data: {
                header: {
                    title: "Wallet",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Tokens",
                        assets: "Assets",
                        passes: "Passes"
                    },
                    tab_active: "tokens",
                    search: true,
                    search_text: 'Search Token'
                }
            }
        })
        .state({
            url: '/wallet-assets',
            name: 'wallet-assets',
            component: 'walletAssetsComponent',
            data: {
                header: {
                    title: "Wallet",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Tokens",
                        assets: "Assets",
                        passes: "Passes"
                    },
                    tab_active: "assets",
                    search: true,
                    search_text: 'Search Asset'
                }
            }
        })
        .state({
            url: '/wallet-passes',
            name: 'wallet-passes',
            component: 'walletPassesComponent',
            data: {
                header: {
                    title: "Wallet",
                    title_btn: {
                        class: "mdi mdi-account-outline",
                        sref: "profile"
                    },
                    navbar: false,
                    tabs: {
                        tokens: "Tokens",
                        assets: "Assets",
                        passes: "Passes"
                    },
                    tab_active: "passes",
                    search: true,
                    search_text: 'Search Pass'
                }
            }
        })
        .state({
            url: '/records',
            name: 'records',
            component: 'recordsComponent',
            data: {
                header: {
                    title: "Records",
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
                    title: "Jamal",
                    navbar: {
                        text: "First name",
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
            url: '/ask',
            name: 'ask',
            component: 'askComponent',
            data: {
                header: {
                    title: "Ask",
                    subtitle: "Fill in details of your request",
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
                    title: "Send",
                    subtitle: "Fill in details of your payment.",
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