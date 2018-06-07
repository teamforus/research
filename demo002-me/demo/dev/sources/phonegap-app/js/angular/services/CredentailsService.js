module.exports = [function() {
    return new(function() {
        this.storageKey = 'accounts';
        this.activeKey = 'active_account';

        this.defaultAccount = {
            "access_token": "78f263fa90011fb26147b3f8c0004a2aa0e14cf94657dc859daf9485de6e4d5b",
            "name" : "Gemeente Zuidhorn",
            "type": "organisation",
        };

        this.getDefault = function() {
            return this.defaultAccount;
        }

        this.getAccounts = function () {
            let accounts = localStorage.getItem(this.storageKey);

            if (accounts != null && accounts.length > 0) {
                accounts = JSON.parse(accounts);
            } else {
                accounts = [];
            }

            accounts.push(this.defaultAccount);
            
            return accounts;
        };

        this.getAccount = function (access_token) {
            return this.getAccounts().filter(function (account) {
                return account.access_token == access_token;
            })[0]
        };

        this.add = function(access_token, name) {
            let accounts = this.getAccounts().filter(function(account) {
                return account.type != 'organisation'
            });

            accounts.push({
                access_token: access_token,
                name: name,
                type: 'personal',
            });

            localStorage.setItem(this.storageKey, JSON.stringify(accounts));
        };

        this.delete = function (access_token) {
            let accounts = this.getAccounts().filter(function (account) {
                return (
                    account.type != 'organisation' && 
                    account.access_token != access_token
                );
            });

            localStorage.setItem(this.storageKey, JSON.stringify(accounts));
        };

        this.set = function(access_token) {
            if (!access_token) 
                localStorage.removeItem(this.activeKey);
            else
                localStorage.setItem(this.activeKey, access_token);
        };

        this.update = function (access_token, name) {
            this.delete(access_token);
            this.add(access_token, name);
        };

        this.get = function (type) {
            return localStorage.getItem(this.activeKey);
        };
    });
}];