import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db, storage } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "@firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export const SettingContext = React.createContext();
export default function Show(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const usersCollectionRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");

  const [uploadProgress, setUploadProgress] = useState(false);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const userId = user && allUsers.find((u) => u.subId === user.sub);

  const femaleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FfemaleAvatar.png?alt=media&token=91a3c821-140c-49b0-9570-08ec29af763f";
  const maleAvatar =
    "https://firebasestorage.googleapis.com/v0/b/omar-f.appspot.com/o/users_pics_and_covers%2Fanonymous%2FmaleAvatar.png?alt=media&token=3cef83c0-7810-4d16-b821-93bed68d83d8";
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
  const createUser = async (newUser) => {
    await addDoc(usersCollectionRef, newUser);
  };
  const updateUser = async (id, userData) => {
    const userDoc = doc(db, "users", id);
    const newData = userData;
    await updateDoc(userDoc, newData);
  };
  const uploadPic = (pic, set, stamp, id) => {
    const name = timeStamp() + pic.name;
    stamp(name);
    const storageRef = ref(storage, `users_pics_and_covers/${id}/${name}`);

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
  const deletePic = (pic, user, folder) => {
    const desertRef = ref(storage, `${folder}/${user}/${pic}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(pic);
  };
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
        setUploadProgress(progress);
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
  const updateLike = async (post, user) => {
    // console.log(user);
    let id = post.id;
    let likes = post.likes;
    let liker = { id: user.sub, anonymous: userId.anonymous };
    const postDoc = doc(db, "posts", id);
    const likersArr = [...likes, liker];
    const newLikesArr = { likes: likersArr };
    await updateDoc(postDoc, newLikesArr);
  };
  const dislike = async (post, user) => {
    console.log(user);
    let id = post.id;
    let likes = post.likes;
    const postDoc = doc(db, "posts", id);
    const likersArr = likes.filter((likerN) => likerN.id !== user.sub);
    const newLikesArr = { likes: likersArr };
    // console.log(likersArr);
    await updateDoc(postDoc, newLikesArr);
  };
  const addComment = async (post, user, commentText) => {
    // console.log(user);
    let id = post.id;
    let comments = post.comments;
    let newComment = {
      id: user.sub,
      time: new Date(),
      text: commentText,
      anonymous: userId.anonymous
    };
    const postDoc = doc(db, "posts", id);
    const commentsArr = [newComment, ...comments];
    // console.log(commentsArr);
    const newCommentsArr = { comments: commentsArr };
    await updateDoc(postDoc, newCommentsArr);
  };
  const deleteComment = async (post, comment) => {
    let id = post.id;
    let comments = post.comments;
    const postDoc = doc(db, "posts", id);
    // const commentsArr = comments.filter(
    //   (commentN) => commentN.id !== comment.id && commentN.time !== comment.time
    // );
    const commentsArr = comments.filter(
      (c) => !(c.time === comment.time && c.id === comment.id)
    );
    const newCommentsArr = { comments: commentsArr };
    await updateDoc(postDoc, newCommentsArr);
    // console.log(newCommentsArr);
  };
  const editComment = async (post, n, commentEdit) => {
    let id = post.id;
    const postDoc = doc(db, "posts", id);
    let comments = post.comments;
    let editedComment = comments.splice(n, 1)[0];
    let x = { ...editedComment, text: commentEdit, editTime: new Date() };
    comments.splice(n, 0, x);
    let newCommentsArr = { comments };
    await updateDoc(postDoc, newCommentsArr);
  };
  const getAllUsers = async () => {
    const unSub = onSnapshot(usersCollectionRef, (snapshot) => {
      let usersArr = [];
      snapshot.docs.map((doc) => usersArr.push({ id: doc.id, ...doc.data() }));
      setAllUsers(usersArr);
    });

    return () => unSub();
  };
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };
  const updatePrivacy = async (id, privacy) => {
    const postDoc = doc(db, "posts", id);
    const newPrivacyState = { privacy: privacy };
    await updateDoc(postDoc, newPrivacyState);
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeStr = `${hours}:${minutes.toString().padStart(2, "0")}`;
    if (date.toDateString() === today.toDateString()) {
      return "Today at:" + timeStr;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday at:" + timeStr;
    } else {
      return date.toDateString() + " at:" + timeStr;
    }
  };
  // const acceptFriendReq =(id,arr)=>{
  //   // let obj = {pending:arr.filter(u=>),
  //   // friends:[]}
  //   // console.log(id, );
  // }
  const state = {
    isAuthenticated,
    isLoading,
    user,
    posts,
    uploadProgress,
    allUsers,
    maleAvatar,
    femaleAvatar,
    createPost,
    timeStamp,
    getPosts,
    setPosts,
    uploadPostsImg,
    updateLike,
    deletePost,
    dislike,
    addComment,
    editComment,
    deleteComment,
    updatePrivacy,
    createUser,
    updateUser,
    getAllUsers,
    uploadPic,
    deletePic,
    formatDate,
  };

  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
