module.exports = {
    templateUrl: './assets/tpl/pages/wallet-voucher-view.html',
    controller: [
        '$state',
        '$stateParams',
        'AuthService',
        'CredentialsService',
        function(
            $state,
            $stateParams,
            AuthService,
            CredentialsService
        ) {
            var ctrl = this;

            if (!$stateParams.voucherId) {
                $state.go('wallet-vouchers');
            }

            ctrl.showEmailPopup = false;
            ctrl.showSplitVoucherPopup = false;

            ctrl.emailForm = {
                values: {}
            };

            ctrl.splitVoucherForm = {
                values: {}
            };

            ctrl.targetTransaction = null;

            ctrl.account = CredentialsService.getAccount(CredentialsService.get());

            ctrl.closeEmailPopup = () => {
                ctrl.showEmailPopup = false;
            };

            ctrl.sendEmailPopup = () => {
                ctrl.showEmailPopup = false;
                ctrl.emailForm.values = {};
                ctrl.showEmailPopupSuccess = true;
            };

            ctrl.closeSplitVoucherPopup = () => {
                ctrl.showSplitVoucherPopup = false;
            };

            ctrl.sendSplitVoucherPopup = () => {
                AuthService.splitVoucher($stateParams.voucherId, ctrl.splitVoucherForm.values).then((res) => {
                    ctrl.splitVoucherForm.values = {};
                    ctrl.closeSplitVoucherPopup();
                    ctrl.showSplitVoucherPopupSuccess = true;
                }, (res) => {
                    ctrl.splitVoucherForm.errors = res.data.errors;
                });
            };

            AuthService.voucherOverview($stateParams.voucherId).then((res) => {
                ctrl.data = res.data;

                $state.$current.data.header.title = ctrl.data.voucher.name;
                $state.$current.data.header.voucher_details = {
                    name: ctrl.data.voucher.name,
                    amount: ctrl.data.voucher.amount,
                };

                $state.$current.data.header.navlist = [{
                    icon : 'arrow-split-vertical',
                    name: 'Delen in kleiner bedrag',
                    onClick: (e, navlist) => {
                        ctrl.showSplitVoucherPopup = true;
                    }
                }, {
                    icon: 'email-outline',
                    name: 'E-mail naar mij',
                    onClick: (e, navlist) => {
                        ctrl.showEmailPopup = true;
                    }
                }];

                setTimeout(() => {
                    $('#qrcode').html('').css('opacity', 0);

                    (new QRCode("qrcode")).makeCode(JSON.stringify({
                        type: 'voucher',
                        value: ctrl.data.voucher.address
                    }));

                    setTimeout(() => {
                        $('#qrcode').css('opacity', 1);
                    }, 100);

                }, 100);
            }, console.log);

            ctrl.showTransaction = (transaction) => {
                ctrl.targetTransaction = transaction;
            };

            ctrl.hideTransaction = () => {
                ctrl.targetTransaction = false;
            };
        }
    ]
};