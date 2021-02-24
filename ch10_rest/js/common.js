var common= 
{
    users:{
        setUserId:function(param)
        {
            window.localStorage.setItem("user_id",param);
        },
        getUserId:function()
        {
            return window.localStorage.getItem("user_id");
        },
        removeUserId:function()
        {
            return window.localStorage.removeItem("user_id");
        },      
        setUserName:function(param)
        {
            window.localStorage.setItem("user_name",param);
        },
        getUserName:function()
        {
            return window.localStorage.getItem("user_name");
        },
        removeUserName:function()
        {
            window.localStorage.removeItem("user_name");
        }
    },
    talking:{
        setNum:function(param)
        {
            window.localStorage.setItem("num",param);
        },
        getNum:function()
        {
            if(window.localStorage.getItem("num") == null)
            {
                return 0;
            }
            return window.localStorage.getItem("num");
        }
    }
}       
        