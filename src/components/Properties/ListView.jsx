import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../navbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Loader from '../../../assets/loader.gif';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from 'react-responsive-modal';



const Liststyle = styled.div`
  width:90%;
  padding:120px 0;
  margin:0px auto;
  @media(min-width:1440px){
    width:80%;
  }
  img{
    width:100%;
  }
  .viewright{
    form{
      background:#27446E;

    }
    h3{
      font-size: 25px;
      text-align: center;
      padding: 41px 0;
      color: white;
      margin:0px;
    }
    .agent{
      text-align:center;
      img{
        object-fit:cover;
        width:75%;
      }
    }
    .name h4{
      font-size:17.5px;
      color:white;
      text-align:center;
    }
    .name h5{
      font-size:14.5px;
      color:white;
      font-weight:600;
      text-align:center;
    }
    .form{
      color:white;
      padding:15px;
      input,label,textarea{
        display:block;
      }
      label{
        font-size:16px;
        display:block;
        padding-bottom:5px;
      }
      input{
        width: 100%;
        height: 37.7px;
        border-radius: 5px;
      }
      textarea{
        width: 100%;
        border-radius: 5px;
      }
      h3{
        margin:0px;
      }
    }
  }
  .button{
    text-align:center;
    padding: 40px 0;
  }
  input[type="submit"] {
    height: 45px;
    width: 79%;
    border: 0;
    border-radius: 5px;
    font-size: larger;
    background-color: #D28662;
    color: white;
    font-family: Tahoma;
    margin-bottom: 100px;
    cursor: pointer;
  }
  .Image {
    width: 25%;
    margin: 0px auto;
    position: relative;
    left: 37%;
  }
  .viewleft{
    box-shadow:0px 3px 6px #DADADB;
    padding-bottom:10px;
    @media (min-width:768px){
      padding:60px 30px;
      .carousel .slider-wrapper {
        width: 85%;
      }
    }
    @media (min-width:1440px){
      li.slide {
        height: 550px;
      }
    }
    .carousel .slide img {
      width: 100%;
      vertical-align: top;
      border: 0;
      object-fit: cover;
      height: 180px;
      @media (min-width:768px){
        height: 300px;
      }
      @media (min-width:1440px){
        height: 550px;
      }
    }
    .thumbs-wrapper.axis-vertical {
      text-align: center;
    }
    h2{
      color:#28456F;
      text-align:center;
      text-transform: capitalize;
      font-size:40px;
    }
    h4{
      color:#28456F;
      text-align:center;
      font-size:29px;
      margin:0px;
      font-weight:400;
    }
    h3{
      color:#404040;
      font-size:24px;
      text-align:center;
    }
    .agent{
      padding-bottom:20px;

    } 
    ul.thumbs.animated {
      padding: 0px;
    }

  }
   
  .return {
    height: 45px;
    width: 30%;
    border: 0;
    border-radius: 5px;
    font-size: larger;
    background-color: #D28662;
    color: white;
    font-family: Tahoma;
    text-align: center;
    display: block;
    margin: 20px auto;
    cursor: pointer;
    .Link{
      color:white;
    }
  }
  
`;

const Info = styled.div`
  width:90%;
  margin:0px auto;

  h1,h2,h3,h4,h5,h6{
    margin:0px;
    display:inline;
  }
  div{
    padding-bottom:20px;
  }
  h6{
    display: inline;
    font-size: 18.5px;
    color:rgba(64,64,64,0.62);
    padding-left: 20px;
    position: relative;
    top: -2px;
  }

  .status h5{
    font-size:21px;
    color:#27446E;
  }
  .id h5{
    font-size:21px;
    color:#27446E;
  }
  
  img{
    width:32px;
  }
 @media (min-width:768px){
   display:grid;
   grid-template-columns:1fr 1fr;
   .Area,.bath,.status{
     margin-left:auto;
   }
  }
 @media (min-width:1440px){
   width:85%;
 }
`;

const Listgroup = styled.div`
  @media (min-width: 1024px){
    display:grid;
    grid-template-columns:2fr 1fr;
    grid-gap:40px;
  }

`;



class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      ready: 'initial',
      open: false,
      Name: " ",
      Email:" "
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const id = params.id;
    this.setState({ ready: 'loading' });
    axios({
      method: 'get',
      url: `https://api.airtable.com/v0/apprAJrG1euRf2tmF/Listings/${id}`,
      headers: { Authorization: `Bearer keyRMRWZ0xrBXA8Yv` },
    }).then(({ data }) => {
      console.log(data)
      this.setState({
        list: data,
        ready: 'loaded',
      });
    });

  }
  GetName = (e) => {
    this.setState({ Name: e.target.value.toUpperCase()});
  };
  GetEmail = (e) => {
    this.setState({ Email: e.target.value});
  };
  onOpenModal = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { list, ready, open, Name, Email } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Liststyle>
          {ready === 'loading' ? (<img src={Loader} className='Image' alt="loader" />) : ''}
          {ready === 'loaded' && (
            <Fragment>
              <Listgroup>
                <div className="viewleft">
                  <Carousel autoPlay>
                    <div>
                      <img src={list.fields.icon[0].url} />
                    </div>
                    <div>
                      <img src={list.fields.icon[1].url} />
                    </div>
                    <div>
                      <img src={list.fields.icon[2].url} />
                    </div>
                    <div>
                      <img src={list.fields.icon[3].url} />
                    </div>
                    <div>
                      <img src={list.fields.icon[4].url} />
                    </div>
                  </Carousel>
                  <h2>{list.fields.Tag}</h2>
                  <Info>

                    <div className="size info">
                      <img src={require("../../../assets/Path 30.png")} alt="location" />
                      <h6>{list.fields.Name}</h6>
                    </div>
                    <div className="Area info">
                      <img src={require("../../../assets/width (1).png")} alt="area" />
                      <h6>{list.fields.Area}    </h6>
                    </div>
                    <div className="bed info">
                      <img src={require('../../../assets/bed.png')} alt="bed" />
                      <h6>{list.fields.Bedrooms}</h6>
                    </div>
                    <div className="bath info">
                      <img src={require('../../../assets/bathtub-with-opened-shower.png')} alt="bath" />
                      <h6>{list.fields.Bathrooms}</h6>
                    </div>
                    <div className="id info">
                      <h5>id: </h5>
                      <h6>{list.id}</h6>
                    </div>
                    <div className="status info">
                      <h5>Status: </h5>
                      <h6>{list.fields.Status}</h6>
                    </div>
                  </Info>

                  <h4>Get it for</h4>
                  <h2>{list.fields.Asking}</h2>
                  <h3 className='agent'>Contact the agent if interested.</h3>
                  <button className="return">
                    <Link to="/Property" className='Link'>Return</Link>
                  </button>
                </div>
                <div className="viewright">
                  <form onSubmit={this.onOpenModal}>
                    <h3>Contact The Agent</h3>
                    <div className="agent">
                      <img src={list.fields.AgentPics[0].url} alt="agent" />
                    </div>
                    <div className="name">
                      <h4>{list.fields.Agents}</h4>
                      <h5>{list.fields.Star}</h5>
                    </div>
                    <div className="form">
                      <label htmlFor="name">Name</label>
                      <input type="text" name='Name' required onChange={this.GetName}/>
                    </div>
                    <div className="form">
                      <label htmlFor="email">Email</label>
                      <input type="email" name='email' required onChange={this.GetEmail} />
                    </div>
                    <div className="form">
                      <label htmlFor="message">Message</label>
                      <textarea name="message" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="button">
                      <input type="submit" value="Send Message"  />
                    </div>
                  </form>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                  <h2>Hello <i>{Name}</i>, your message has been recieved and a mail has been sent to <i>{Email}</i>.</h2>
                  <h2>Our Agent {list.fields.Agents} will be in contact with you soon for follow up.</h2>
                </Modal>
              </Listgroup>
            </Fragment>
          )}
        </Liststyle>
        <Footer />
      </Fragment>
    );
  }
}

export default ListView;
