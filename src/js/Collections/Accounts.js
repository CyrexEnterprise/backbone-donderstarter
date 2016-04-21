
define(
	['Collections/BaseCollection'],
	function (BaseCollection)
	{
		var Accounts = BaseCollection.extend({
			collectionType: '/accounts'
		});

		return Accounts;
	}
);
