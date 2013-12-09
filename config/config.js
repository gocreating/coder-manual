var STA = {
	NONE: 0,
	INFO: 1,
	FAIL: 2,
	SUCC: 3
};

module.exports = {
	cookieSecret: 'auth-demo',
	db: {
		name: 'users',
		host: 'localhost'
	},
	status: STA,
	message: {
		DEFAULT:           { display: false, type: STA.NONE, description: '' },
		ERR_SYS:           { display: true,	 type: STA.FAIL, description: 'System error.' },
		ERR_ACCOUNT_EXIST: {	display: true,	 type: STA.INFO, description: 'Email is already exists.' },
		SUCC_SIGNUP:       {	display: false, type: STA.SUCC, description: 'Signup successfully.' },
		ERR_LOGIN:         {	display: true,  type: STA.INFO, description: 'Wrong email or password.' },
		SUCC_LOGIN:        {	display: false, type: STA.SUCC, description: 'Login successfully.' },
		LOGOUT:            {	display: false, type: STA.SUCC, description: 'Logout successfully.' }
	}
};