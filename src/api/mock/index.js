
import Mock from 'mockjs';

export const data = Mock.mock("/mock",{  
  //"/mock"是通过ajax获取数据时填写的地址，可以随意写。但要和ajax请求时填写的地址一致。
	"userinfo|4":["@cname"]
});