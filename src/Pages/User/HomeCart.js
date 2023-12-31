import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, resetCartMessage, increase, decrease, resetCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import RoomCart from "../../Components/User/RoomCart";
import PaymentForm from "../../Components/User/PaymentForm";
import Footers from "../../Components/User/Footers";
import "../../Css/styleroom.css";
import Headerbooking from "../../Components/User/header_booking/Headerbooking";
import { payment } from "../../redux/actions/PayAction";
import BookingSummary from "../../Components/User/BookingSummary";
import VisitorAPI from "visitorapi";
import formatDatetime from "../../util/DatetimeUtil";
function HomeCart() {
  const dispatch = useDispatch()
  const cartMessage = useSelector((state) => state.cartReducer.message);
  const cartQuantity = useSelector((state) => state.cartReducer.quantity);
  const doCartAction = useSelector((state) => state.cartReducer.type);
  const [rooms, setRooms] = useState([]);
  const [cart, setCart] = useState([]);
  const [listId, setListId] = useState([])
  const checkLogin = localStorage.getItem("loggedIn");
  const [visitorInfo, setVisitorInfo] = useState({})
  const [startDate, setStartDates] = useState(new Date());
  const startDates = formatDatetime(startDate, "DD/MM/YYYY")
  // console.log(startDates);
  // Get visitor information
  useEffect(() => {
    VisitorAPI("W4oc0MZDdFxeH1n1IfX0").then(data => {
      setVisitorInfo(data)
    }).catch(error => {
      console.log(error);
    });
  }, [])

  // Call api and get list rooms
  useEffect(() => {
    fetch('http://localhost:3001/rooms')
        .then((response) => response.json())
        .then((rooms) => {
            // const room = rooms.filter((room) => room.checkin >= startDates )
            setRooms(rooms)
            // console.log(room);
        })

        .catch((error) => {
        });
}, [])

  // Call api and get data
  useEffect(() => {
    if (!checkLogin) {
      let guestCart = []
      if (localStorage.getItem('guestCart')) {
        guestCart = JSON.parse(localStorage.getItem('guestCart'))
      }
      const result = []
      guestCart.forEach((item) => {
        rooms.forEach((room) => {
          if (room.id === item.idRoom) {
            let quantity = item.quantity
            result.push({ ...room, quantity })
          }
        });
      })
      setCart(result);
    } else {
      fetch("http://localhost:3001/userCart")
        .then((response) => response.json())
        .then((cart) => {
          let idUser;
          if (localStorage.getItem("user")) {
            idUser = JSON.parse(localStorage.getItem("user")).id;
          }
          const filteredRooms = cart.filter(
            (product) => product.idUser === idUser
          );
          const result = []
          filteredRooms.forEach((item) => {
            rooms.forEach((room) => {
              if (room.id === item.idRoom) {
                let quantity = item.quantity
                result.push({ ...room, quantity })
              }
            });
          })
          setCart(result);
        })
        .catch((err) => { });
    }
  }, [cartQuantity, doCartAction, rooms]);

  // Get list id room
  useEffect(() => {
    const list = []
    cart.forEach((room) => list.push(room.id))
    setListId(list)
  }, [cart])

  // Handling event
  const handleRemove = useCallback((id) => {
    if (!checkLogin) {
      dispatch(remove(id, false, null))
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(remove(id, true, user.id))
    }
  }, [dispatch])

  const handleIncrease = useCallback((id,checkin) => {
    if (!checkLogin) {
      dispatch(increase(id,checkin, false, null))
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(increase(id,checkin, true, user.id))
    }
  }, [dispatch])

  const handleDecrease = useCallback((id,checkin) => {
    if (!checkLogin) {
      dispatch(decrease(id,checkin, false, null))
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(decrease(id,checkin, true, user.id))
    }
  }, [dispatch])

  useEffect(() => {
    toast.clearWaitingQueue()
    if (cartMessage) {
      toast(cartMessage, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "message"
      });
      dispatch(resetCartMessage())
    }
  }, [cartMessage])


  const totalRoomPrice = useMemo(() => {
    return cart.reduce((total, room) => total + room.price * room.quantity, 0);
  }, [cart]);


  const thanhtoan = (formData) => {
    if (!checkLogin) {
      dispatch(payment(formData, cart, totalRoomPrice, null, visitorInfo));
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(payment(formData, cart, totalRoomPrice, user.id, visitorInfo));
    }
  }

  const reset = useCallback(() => {
    if (!checkLogin) {
      dispatch(resetCart(listId, false, null))
    } else {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(resetCart(listId, true, user.id))
    }
  }, [listId])

  return (
    <>
      <ToastContainer />
      <Headerbooking />
      <div style={{ backgroundColor: '#f8f8f8', padding: '100px 0' }}>
        <div className="container" >
          <div className="backpage">
            <Link to="/bookingpage" >
              <i className="fa-solid fa-arrow-left"></i>
              Return
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6">
              <RoomCart
                removeRoom={handleRemove}
                cart={cart}
                totalRoomPrice={totalRoomPrice}
                guestCart={cart}
                increaseQuantity={handleIncrease}
                decreaseQuantity={handleDecrease}
              />
              <BookingSummary totalRoomPrice={totalRoomPrice} />
            </div>
            <div className="col-md-6">
              <PaymentForm totalRoomPrice={totalRoomPrice} thanhtoan={thanhtoan} reset={reset} cart={cart} />
            </div>
          </div>
        </div>
      </div>
      <Footers />
    </>
  );
}

export default HomeCart;