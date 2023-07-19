import React from "react";
import styled  from "styled-components";
import PostModal from './PostModal';
import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions"; 
import ReactPlayer from "react-player";

const style={
    objectFit:"contain",
    width:"100%",
    height:"100%",
}

const Main=(props)=>{
    const [showModal ,setshowModal]=useState("close");

    useEffect(()=>{
        props.getArticles();

    },[]);

    const handleClick=(e)=>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }

        switch(showModal){

            case "open" :
                setshowModal("close");
                break;
            case "close":
                setshowModal("open");
                break;
            default:
                setshowModal("close");
        }
    }

    return(
        
            
        <>
            { props.articles.length === 0 ?
                <p>There are no articles</p>
                
            :

            <Container>
                <ShareBox>
                    
                    <div>
                        {props.user && props.user.photoURL ? (
                            <img src={props.user.photoURL}alt=""/>
                        ):(
                            <img src="/images/user.svg" alt=""/>
                        )}
                        <button onClick={handleClick} disabled={props.loading ? true :false}>Start a Post</button>
                    </div>

                    <div>
                        <button>
                            <img src="/images/photo-icon.png"/>
                            <span>Photo</span>
                        </button>
                        <button>
                            <img src="/images/video-icon.png"/>
                            <span>Video</span>
                        </button>
                        <button>
                            <img src="/images/event-icon.png"/>
                            <span>Event</span>
                        </button>
                        <button>
                            <img src="/images/article-icon.png"/>
                            <span>Write Article</span>
                        </button>
                        
                    </div>
                </ShareBox>
                <Content>
                    {props.loading && <img src="/images/spin-loader.svg" alt=""/>}
                
                    {props.articles.length > 0 && 
                    props.articles.map((article,key)=>(
                        <Article key={key}>
                            <SharedActor>
                                <a>
                                    <img src={article.actor.image} alt=""/>
                                    <div>
                                        <span>{article.actor.title}</span>
                                        <span>{article.actor.description}</span>
                                        {/* <span>{article.actor.date.toDate().toLocalDateString}</span> */}
                                    </div>
                                </a>
                                <button>
                                    <img src="/images/ellipsis.svg" alt=""/>
                                </button>
                            </SharedActor>
                            <Description>{article.description}</Description>
                            <sharedImg >
                                <a>{
                                     !article.sharedImg && article.video ?( <ReactPlayer width={'100%'} url={article.video}/> 
                                     ):(
                                        article.sharedImg && <img src={article.sharedImg} alt="" style={style} />
                                     )
                                    }
                                </a>
                            </sharedImg>
                            
                            <SocialCounts>
                                <li>
                                    <button>
                                        <img src="/images/like.svg" alt=""/>
                                        <img src="/images/comment.svg" alt=""/>
                                    </button>
                                </li>
                                <li>
                                    <a>{article.comments}</a>
                                </li>
                            </SocialCounts>
                            <SocialActions>
                                <button>
                                    <img src="/images/like.png" alt=""/>
                                    <span>Like</span>
                                </button>
                                <button>
                                    <img src="/images/commentt.png" alt=""/>
                                    <span>Comment</span>
                                </button>
                                <button>
                                    <img src="/images/repost.png" alt=""/>
                                    <span>Repost</span>
                                </button>
                                <button>
                                    <img src="/images/share.png" alt=""/>
                                    <span>Share</span>
                                </button>
                            </SocialActions>
                        </Article>
                    ))}
                </Content>
                <PostModal showModal={showModal} handleClick={handleClick}/>
                {/* <PostModal/> */}
            </Container>
            }   
        </>
            
        
    )
};
const Container=styled.div`
    grid-area:main;
    
`

const CommonCard=styled.div`
    text-align:center;
    overflow:hidden;
    margin-bottom:8px;
    background-color:#fff;
    border-radius:5px;
    position:relative;
    border:none;
    box-shadow:0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`

const ShareBox=styled(CommonCard)`
    display:flex;
    flex-direction:column;
    color:#958b7b;
    margin:0 0 8px;
    background:white;
    
    div{
        button{
            outline:none;
            color:rgba(0,0,0,0.6);
            font-size:14px;
            linr-height:1.5;
            min-height:48px;
            background:transparent;
            // border:none;
        }

        &:first-child{
            display:flex;
            align-items:center;
            padding:8px 16px 0px 16px;
            

            img{
                width:48px;
                border-radius:50%;
                margin-right:8px;
            }

            button{
                margin:4px 0px;
                flex-grow:1;
                border-radius:35px;
                padding-left:16px;
              
                
                border:1px solid rgba(0,0,0,0.15);
            }
        }

        &:nth-child(2){
            
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom:8px;
   
            button{
                border:none;
                display:flex;
                align-items:center;
                img{
                    height:25px;
                    width:25px;
                    margin:0 4px 0 -2px;
                }
                span{
                    color:#70b5f9;
                }
            }

        }
    }
`

const Article=styled(CommonCard)``

const SharedActor=styled.div`
    padding-right:40px;
    display:flex;
    flex-wrap:nowrap;
    padding:12px 16px 0;
    margin-bottom:8px;
    align-items:center;

    a{
        margin-right:12px;
        flex-grow:1;
        overflow:hidden;
        display:flex;
        text-decoration:none;

        img{
            width:48px;
            height:48px;
            border-radius:50%;
        }

        &>div{
            display:flex;
            flex-direction:column;
            flex:grow:1;
            flex-basis:0;
            margin-left:8px;
            align-items:flex-start;
            // overflow:hidden;

            span{
                tex-align:left;

                &:first-child{
                    font-size:14px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }

                &:nth-child(2){
                    font-size:12px;
                    color:rgba(0,0,0,0.6);
                }
                &:nth-child(3){
                    font-size:12px;
                    color:rgba(0,0,0,0.6);
                }
            }
        }
    }
    button{
        position:absolute;
        right:12px;

        // top:1;

        background:transparent;
        border:none;
        outline:none;
        img{
            width:25px;
            
        }
    }
`

const Description=styled.div`
    padding:0 16px;
    overflow:hidden;
    color: rgba(0,0,0,0.9);
    font-size:14px;
    text-align:left;
    padding-top:3px;
    padding-bottom:3px;
    font-family: Arial, sans-serif;
    letter-spacing:0.007rem;
    line-height:1.3;
`

const sharedImg=styled.div`
    margin-top:8px;
    width:100%;
    display:block;
    position:relative;
    background-color:#f9fafb;

    a{
        img{
            object-fit:contain;
            width:100%;
            height:100%;
        }
    }

`

const SocialCounts=styled.ul`

    line-height:1.3;
    display:flex;
    align-items:flex-start;
    overflow:auto;
    margin:0 16px;
    padding:8px 0;
    border-bottom:1px solid #e9e5df;
    list-style:none;

    li{
        margin-right:5px;
        font-size:12px;
        button{
            display:flex;
            outline:none;
            border:none;
            background:white;
        }

        a{
            color:rgb(59, 59, 154);
        }
    }
`

const SocialActions=styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0;
    min-height:48px;
    padding:4px 8px;

    button{
        display:inline-flex;
        align-items:center;
        padding:8px;
        color:#0a66c2;
        background-color:#fff;

        border:none;
        outline:none;
     
        img{
            
            width:1rem;
        }
        span{
            color:#434649;
        }
        @media (min-width:768px){
            span{
                margin-left:8px;
            }
        }
    }
`

const Content=styled.div`

    text-align:center;
    color:rgb(59, 50, 50);
    &>img{
        width:30px;
    }
`
const mapStateToProps=(state)=>{
    return {
        loading:state.articleState.loading,
        user:state.userState.user,
        articles:state.articleState.articles,
    }
}
const mapDispatchToProps=(dispatch)=>({
    getArticles:() => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Main);