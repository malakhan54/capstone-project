import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function User(props) {

    const URL = "http://127.0.0.1:8901/users"


    const [userDetails, setUserDetails] = useState("")

    let userId = props.userId;

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        // get only single user 
        const goTo = URL + "/" + userId
        axios
            .get(goTo)
            .then(response => {
                let uData = response.data
                let disp =
                    <div className="card-body">
                        <h5 className="card-header">{uData.name}</h5>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td className='fw-bold'>Id: </td>
                                    <td>{uData._id}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>Username:</td>
                                    <td>{uData.username}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>Phone No.:</td>
                                    <td>{uData.phoneNo}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>Email: </td>
                                    <td>{uData.email}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>Address:</td>
                                    <td>{uData.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                setUserDetails(disp)
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.message)
                    this.setState({ error: error.response.data.message });
                } else {
                    console.log(error.message)
                    this.setState({ error: error.message });
                }
            });
    }

    return (
        <div className="card" >
            {userDetails}
        </div>

    )

}
