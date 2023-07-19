import { styled } from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { postArticleAPI } from "../actions";
const PostModal=(props)=>{

    const [editorText,setEditorText]=useState("");
    const [shareImage,setShareImage]=useState("");
    const [videoLink,setVideoLink]=useState("");
    const [AssetArea,setAssetArea]=useState("");

    const handleChange=(e)=>{
        const image=e.target.files[0];

        if(image=== "" || image === undefined){
            alert(`not an image , the file is a ${typeof image}`);
            return ;
        }

        setShareImage(image);
    }

    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticle=(e) =>{
        console.log("hello");
        e.preventDefault();
        if(e.target !== e.currentTarget){
            console.log("helloooo");
            return;
        }

        const payload={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            // timestamp:firebase.firestore.Timestamp.now
        }

        props.postArticle(payload);
        reset(e);
    }

    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    }
    return (
        <>
            { props.showModal ==='open' &&
                <Container>
                    <Content>
                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={(event)=>reset(event)}>
                                <img src="/images/close-icon.png" alt=""/>
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {props.user.photoURL ?(
                                    <img src={props.user.photoURL} alt=""/>
                                ):(
                                    <img src="/images/user.svg" alt=""/>
                                )}
                                <span>{props.user.displayName}</span>
                            </UserInfo>
                            <Editor>
                                <textarea 
                                    value={editorText}
                                    onChange={(e)=>setEditorText(e.target.value)}
                                    placeholder="What do you want to talk about ?"
                                    autoFocus={true}
                                />
                                {AssetArea === "image" ? (
                                    <UploadImage>
                                        <input 
                                            id="file"
                                            type="file"
                                            accept="image/gif ,image/jpeg ,image/png"
                                            style={{display:"none"}}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label for="file">Select an image to share</label>
                                        </p>
                                        {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                                    </UploadImage>

                                ):( AssetArea=== "media" &&
                                    <>
                                        <input 
                                            type="text"
                                            placeholder="Please input a video Link"
                                            value={videoLink}
                                            onChange={(e)=>setVideoLink(e.target.value)}
                                            style={{width:"100%", padding:"6px 0px"}}
                                        />
                                        {videoLink && (<ReactPlayer width={"100%"} url={videoLink}/>)}
                                    </>
                                )}
                            </Editor>
                        </SharedContent>
                        <SharedCreation>
                            <AttachAssets>
                                <AssetButton onClick={()=>switchAssetArea("image")}>
                                    <img src="/images/image-icon.png" alt="" />
                                </AssetButton>
                                <AssetButton onClick={()=>switchAssetArea("media")}>
                                    <img src="/images/vidd-icon.png" alt="" />
                                </AssetButton>
                            </AttachAssets>
                            <ShareComment>
                                <AssetButton>
                                    <img src="/images/coment.png" alt="" />
                                    
                                </AssetButton>
                            </ShareComment>
                            <PostButton 
                                disabled={!editorText ? true :false}
                                onClick={(event)=> postArticle(event)}>
                                Post
                            </PostButton>
                        </SharedCreation>
                    </Content>
                </Container>
            }
        </>
    );
}


const Container=styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:999;
    color:black;
    background-color:rgba(0,0,0,0.8);
`

const Content=styled.div`
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:98%;
    overflow:initial;
    border-radius:5px;
    position:relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin:0 auto;

`;

const Header=styled.div`
   
    padding:16px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height:1.5;
    color:rgba(0,0,0,0.6);
    font-weight:400;
    display:flex;
    justify-content:space-between;
    align-items:center;

    button{
        height:40px;
        width:40px;
        min-width:auto;
        color:rgba(0,0,0,0.15);
        border:none;
        outline:none;
        background:none;

        svg,img{
            pointer-events:none;
        }
    }
    h2{
        color:#434649;
    }
`

const SharedContent=styled.div`
   display:flex;
   flex-direction:column;
   flex-grow:1;
   verticle-align:baseline;
   background:transparent;
   padding:8px 12px;

`



const UserInfo=styled.div`
   display:flex;
   align-items:center;
   padding:12px 24px;

    svg,img{
        width:48px;
        height:48px;
        background-clip:content-box;
        border:2px solid transparent;
        border-radius:50%;
    }

    span{
        font-weight:600;
        font-size:16px;
        line-height:1.5;
        margin-left:5px;
        color:#434649;
    }

`

const SharedCreation=styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 30px;
`

const AssetButton=styled.button`
    display:flex;
    align-items:center;
    height:48px;
    min-width:auto;
    color:rgba(0,0,0,0.15);
    border:none;
    justify-content:center;
    background:white;
    img{
        width:25px;
        height:25px;
    }

`
const AttachAssets=styled.div`
    display:flex;
    align-items:center;
    padding-right:8px;
    
    ${AssetButton}{
        width:40px;
    }
`

const ShareComment=styled.div`
    padding-left:8px;
    margin-right:auto;
    // border-left:1px solid rgba(0,0,0,0.15);

    ${AssetButton}{
        svg{
            margin-left:5px;
        }
    }

`
const PostButton=styled.button`
    min-width:60px;
    border-radius:20px;
    padding-left:16px;
    padding-right:16px;
    background:${(props)=> (props.disabled ? "rgba(0,0,0,0.08)" :"#0a66c2")};
    color:${(props)=>(props.disabled ? "#c4bebe" : "white")};
    border:none;
    &:hover{
        background:${(props)=>(props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`
const Editor=styled.div`
    padding:12px 24px;
    
    textarea{
        width:100%;
        min-height:100px;
        resize:none;
    }
`

const UploadImage=styled.div`
    text-align:center;

    img{
        width:100%;
        max-height:300px;
    }
`;
const mapStateToProps=(state)=>{
    return {
        user:state.userState.user,
    };
};

const mapDispatchToProps=(dispatch)=>({
    postArticle:(payload)=> dispatch(postArticleAPI(payload))
});

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);