import React from "react";
import { Form, Input, Button,Card, Radio } from "antd";
import "antd/dist/antd.css";
import auth from "./auth";
import { Link,  } from "react-router-dom";
import {withRouter} from "./WithRouter";
import "./styles/Dashboard.css";

import apis from "../api/apis"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      bank:false,
      guest:false,
      bloodType:"",
      bio:""
    };
  }
  
  render() {
    const onFinish = async (values) => {
      console.log("Success:", values);
      const payload = values;
      if(values.isDonor=="guest"){
        await apis.guestLogin(payload)
      .then((res) => {
        auth.login(()=>{
          console.log(this.props);
          console.log(res.data)

          let r = res.data.result;
          this.props.setData(
            r.email_id,r.fullName,r.isDonor, res.data.allUsers, res.data.allBanks, r
          );
          this.props.navigate('/dashboard',this.state)
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login unsuccessfull");
      })
      return;

      }
      
      await apis.LoginID(payload)
      .then((res) => {
        auth.login(()=>{

          console.log(this.props);
          console.log(res.data)

          let r = res.data.result;
          console.log(r)
          this.props.setData(
            r.email_id,r.fullName,r.isDonor, res.data.allUsers, res.data.allBanks, r
          );
          if(r.isDonor){
            console.log(this.props)
            this.props.setDonorData(r.bloodType,r.bio)
          }
          this.props.navigate('/dashboard',this.state)
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login unsuccessfull");
      })

      
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div className="font" style={{background:"grey",height:"100vh"}}>
        <div className="site-card-border-less-wrapper">
        <div className="logo" style={{color:"white",backgroundColor:"rgba(0,0,0,.85)",fontSize:"50px",padding:"1%",textAlign:"center"}}><span style={{textAlign:"center"}}>&#9736;BDA</span> </div>

          <Card
            title={<pre>            Login</pre>}
            bordered={true}
            style={{ width: 400, marginTop: "3%", marginLeft: "33%", backgroundColor:"rgb(189, 185, 185)" }}
            headStyle={{className:"font" }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email ID"
                name="email_id"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="YourName@domain.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="****" />
              </Form.Item>
              <Form.Item
                label="Are you a"
                name="isDonor"
                rules={[
                  {
                    required: true,
                    message: "Please opt this!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value={true} onClick={(e)=>{this.setState({bank:false})}}>Donor</Radio.Button>
                  <Radio.Button value={false} onClick={(e)=>{this.setState({bank:true})}}>Bank</Radio.Button>
                  <Radio.Button value={"guest"} onClick={(e)=>{this.setState({bank:true,guest:true})}}>Guest</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/*<Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>*/}

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" >
                  Log In
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 5,
                  span: 16,
                }}>
                {//<Link to="/dashboard"> dash Up</Link>
                }
                Don't have an account?<Link to="/sign"> Sign Up</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
