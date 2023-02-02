// the data saved in userProfileVar temporarily then it will be uploaded to firebase store.
// After data modification and submission, the userProfileVar object will constantly saved in userProfileConst.
// the data will be displayed on the profile component or any other component from userProfileConst.

//the basic data wil be retrieved from a form which is displayed after the user be logged in; the userProfileVar will be fill and uploaded to firebase store then the userProfileConst will never be empty

// the form will be always shown unless the user fill and submit it(db is not empty).

///////////////////////////////////////
////////////old notes//////////////////
///////////////////////////////////////

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// firebase dependencies
import { db, storage } from "../firebaseConfig";

// to store data
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";

//to store picturs
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const SettingContext = React.createContext();

export default function Show(props) {
  const timeStamp = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const mSeconds = new Date().getMilliseconds();
    return `${year}-${month}-${day}@${hours}:${minutes}:${seconds},${mSeconds}`;
  };

  const [uploadProgress, setUploadProgress] = useState(false)
  //here we get user authentication, pic, name, and etc..
  const { user, isAuthenticated, isLoading } = useAuth0();
  // now we should save these data to firebase storage with the data which we added to create a user profile.

  /////////////////to store user data/////////////////////////////
  const usersCollectionRef = collection(db, "users");

  const createUser = async (newUser) => {
    await addDoc(usersCollectionRef, newUser);
  };

  const updateUser = async (id, userData) => {
    // console.log(id, userData);
    const userDoc = doc(db, "users", id);
    const newData = userData;
    await updateDoc(userDoc, newData);
  };

  const getUser = async () => {
    const data = await getDocs(usersCollectionRef);
    const userArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userObj = userArr.find((u) => u.email === user.email);
    setUserProfileConst(userObj);
  };
  ////////////////////////////////////////////////////////////////

  /////////////////to store user pic/////////////////////////////
  const [picTime, setPicTime] = useState(null);
  const [coverTime, setCoverTime] = useState(null);

  const uploadPic = (pic, set, stamp, user) => {
    const name = timeStamp() + pic.name;
    stamp(name);
    const storageRef = ref(storage, `users_pics_and_covers/${user}/${name}`);

    const uploadTask = uploadBytesResumable(storageRef, pic);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(downloadURL);
        });
      }
    );
  };

  //delete nonsense pic
  const deletePic = (pic, user, folder) => {
    const desertRef = ref(storage, `${folder}/${user}/${pic}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(pic);
  };
  ////////////////////////////////////////////////////////////////

  //state for class includes user data and pics, which will b stored in FB db then display in the interface.
  const [userProfileConst, setUserProfileConst] = useState(undefined);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////to store user Posts/////////////////////////////
  const postsCollectionRef = collection(db, "posts");

  const createPost = async (newPost) => {
    await addDoc(postsCollectionRef, newPost);
  };

  const getPosts = async () => {
    // const posts = await getDocs(postsCollectionRef);
    // const postsArr = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // // const userObj = userArr.find((u) => u.email === user.email);
    // setPosts(postsArr);
    // console.log(postsArr);
    const unsub = onSnapshot(postsCollectionRef, (snapshot) => {
      let data = [];
      snapshot.docs.map((doc) => data.push({ id: doc.id, ...doc.data() }));
      // console.log("Current data: ", data);
      setPosts(data);
    });

    return () => unsub();
  };
  ////////////////////////////////////////////////////////////////
  ///////////////upload post's img////////////////////////////////

  const uploadPostsImg = (img, user, setImg, setImgName) => {
    const imgName = timeStamp() + img.name;
    const storageRef = ref(storage, `post's_images/${user}/${imgName}`);

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress)
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL);
          setImgName(imgName);
        });
      }
    );
  };
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////update likes//////////////////////////////////////
  //like++
  const updateLike = async (post, user) => {
    console.log(user);
    let id = post.id;
    let likes = post.likes;
    let liker = { liker: user.name, email: user.email };
    const postDoc = doc(db, "posts", id);
    const likersArr = [...likes, liker];
    const newLikesArr = { likes: likersArr };
    await updateDoc(postDoc, newLikesArr);
  };
  //like--
  const dislike = async (post, user) => {
    console.log(user);
    let id = post.id;
    let likes = post.likes;
    const postDoc = doc(db, "posts", id);
    const likersArr = likes.filter((likerN) => likerN.email !== user.email);
    const newLikesArr = { likes: likersArr };
    // console.log(likersArr);
    await updateDoc(postDoc, newLikesArr);
  };
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  ///////////////////update comment//////////////////////////////////////
  //Add comment++
  const addComment = async (post, user, commentText) => {
    // console.log(user);
    let id = post.id;
    let comments = post.comments;
    let newComment = {
      commenter: user.name,
      email: user.email,
      time: timeStamp(),
      text: commentText,
    };
    const postDoc = doc(db, "posts", id);
    const commentsArr = [newComment, ...comments];
    // console.log(commentsArr);
    const newCommentsArr = { comments: commentsArr };
    await updateDoc(postDoc, newCommentsArr);
  };
  //Delete comment--
  const deleteComment = async (post, comment) => {
    // console.log(user);
    let id = post.id;
    let comments = post.comments;
    const postDoc = doc(db, "posts", id);
    const commentsArr = comments.filter(
      (commentN) =>
        commentN.email !== comment.email || commentN.time !== comment.time
    );
    const newCommentsArr = { comments: commentsArr };
    // console.log(newCommentsArr);
    await updateDoc(postDoc, newCommentsArr);
  };

  //Edit comment
  const editComment = async (post, n, commentEdit) => {
    let id = post.id;
    const postDoc = doc(db, "posts", id);
    let comments = post.comments;
    let editedComment = comments.splice(n, 1)[0];
    let x = { ...editedComment, text: commentEdit, editTime: timeStamp() };
    comments.splice(n, 1, x);
    console.log(comments);
    let newCommentsArr = { comments };
    await updateDoc(postDoc, newCommentsArr);
  };
  //////////////////////////////////////////////////////////////////////////////
  ///fitch all users

  const getAllUsers = () => {
    const unsub = onSnapshot(usersCollectionRef, (snapshot) => {
      let usersArr = [];
      snapshot.docs.map((doc) => usersArr.push({ id: doc.id, ...doc.data() }));
      // console.log("Current data: ", usersArr);
      setAllUsers(usersArr);
    });

    return () => unsub();
  };
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //delete post
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // update privacy
  const updatePrivacy = async (id, privacy) => {
    // console.log(user);
    // console.log(id, privacy);
    const postDoc = doc(db, "posts", id);
    const newPrivacyState = { privacy: privacy };
    await updateDoc(postDoc, newPrivacyState);
  };
  const [cover, setCover] = useState("https://via.placeholder.com/900x200.png");
  const [pic, setPic] = useState("");
  const [userName, setUserName] = useState("");
  const [fistName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [birthday, setBirthday] = useState(null);

  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState(null);

  const state = {
    isAuthenticated,
    isLoading,
    user,
    userProfileConst,
    userProfileVar: {
      userName,
      fistName,
      LastName,
      email,
      language,
      gender,
      pic,
      cover,
      bio,
      interests,
      birthday,
    },
    profileHandler: {
      setCover,
      setPic,
      setBio,
      setInterests,
      setBirthday,
      setUserName,
      setFirstName,
      setLastName,
      setEmail,
      setLanguage,
      setGender,
    },
    createPost,
    posts,
    timeStamp,
    getPosts,
    setPosts,
    uploadPostsImg,
    uploadProgress,
    updateLike,
    deletePost,
    dislike,
    addComment,
    editComment,
    deleteComment,
    updatePrivacy,
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    allUsers,
    setUserProfileConst,
    uploadPic,
    deletePic: {
      deletePic,
      setPicTime,
      setCoverTime,
      picTime,
      coverTime,
    },
  };

  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
