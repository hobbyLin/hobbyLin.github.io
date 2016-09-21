$('#register #submit').click(function(){
    var cc=    $.zfValidForm
			({ vibconfig: {
							"tipsmsgvibTime": 500,		//跳动表单提示跳动时间（ms）

							"tipsmsgFadeTime1": 6500,		//跳动表单提示消失时间（ms）

							'vebspeed':100,						//跳动表单速度时间（ms）

							"tipsmsgFadeTimeo": 7000,		//表单提示消失时间（ms）	 tipsStyle:'1'

							'resultbool':true
						},
            ruleAdd:([
               {node:"._name", ruleType:"account",errmsg:"字母开头，6-16字符，字母数字下划线"}, //这个个数要和表单个数一致(node是class名字加一个点)

               {node:"._pwd", ruleType:"pwd",errmsg:"字母开头，长度在6~18之间，只能包含字符、数字和下划线"}, //

               {node:"._pwd2",node2:"._pwd", ruleType:"isEq",errmsg:["两次输入的密码不一致",'请再次输入密码']},
//             {node:"._Qq", ruleType:"isQq",errmsg:"请输入正确的QQ号"},    //

//             {node:"._realname", ruleType:"isChinese",errmsg:"请输入正确的中文名"},   //

               {node:"._email", ruleType:"email",errmsg:"请填写正确的邮箱"}  //

//             {node:"._hobby",ruleType:"checkbox",errmsg:"请选择爱好"},
//             {node:"._gender",ruleType:"radio",errmsg:"请选择性别"},
//             {node:"._city",ruleType:"select",errmsg:"请选择所在城市"},
			 //  {node:"._real", ruleType:"other",errmsg:"请输入正确的中文名",condition:function(){return $('._real').val()==''? true:false}},   //添加表单后 ruleType:"othor"需要加一个名字是condition的方法，这个方法要返回ture或者false


			 //  {node:"._hobby1",ruleType:"othercheck",errmsg:"请选择爱好"},        //如果是checkbox是这种添加方式 ruleType:"othercheck"


            ]),
           tipsStyle:'2',   //可以选择1或者2  1是隐藏  2是跳动后隐藏

        })
		console.log(cc);  //返回表单验证结果

});