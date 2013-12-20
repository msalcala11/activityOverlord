/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    name: {
    	type: 'string',
    	required: true
    },

    title: {
    	type: 'string'
    },

    email: {
    	type: 'string',
    	email: true,
    	required: true,
    	unique: true
    },

    encryptedPassword: {
    	type: 'string'
    },
/*
    toJSON: function(){
    	var obj = this.toObject();
    	delete obj.password;
    	delete obj.confirmation;
    	delete obj.encryptedPassword;
    	return obj;
    }
*/
  }

};
