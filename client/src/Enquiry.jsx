//import React from 'react'
import { Button, Checkbox, Label, Textarea, TextInput, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import { EnquiryList } from './enquiry/01-enquiryList.jsx';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
//import { enquiryList } from '../../server/App/controller/web/01-enquiry-controller.js';

export default function Enquiry() {
    let [enquiryList , setEnquiryList] = useState([])

    let [formData , setFormData] = React.useState({
        name : '',
        email : '',
        phone : '',
        message : '',
        id : ''
    })
    let saveEnquiry = (event) => {
        //alert('Enquiry Saved')
        event.preventDefault()  // iska kam page ko refresh hone se rok dene ka hai 
        // let formData = {  // for posting data
        //     name : event.target.name.value,  // target means Form 
        //     email : event.target.email.value,
        //     phone : event.target.phone.value,
        //     message : event.target.message.value
        // }

        if(formData._id) {  // if id is there then update ka kam karna hai 
            // update
            axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}` , formData).then((response) => {  // you are giving/posting formData to this API
            console.log(response.data)
            toast.success('Enquiry Updated successfully')   
            setFormData({  
                name : '',
                email : '',
                phone : '',
                message : '',
                _id : ''
            })
            getAllEnquiry();
            })
        }
        else { // if id is not there then insert ka kam karna hai 
        axios.post('http://localhost:8020/api/website/enquiry/insert' , formData).then((response) => {  // you are giving/posting formData to this API
            console.log(response.data)
            toast.success('Enquiry saved successfully')  // jab ye function chalega , to ye ToastContainer ko open karega , toastcontainer is a pop-up that appears when saving or filling some forms 
            setFormData({  // afterr getting response we are keeping it blank
                name : '',
                email : '',
                phone : '',
                message : ''
            })
            getAllEnquiry();
        })
        }

// we are now hitting API from frontend , in this entire course we learned to hit API from backend like thunderclient and all now we are doing this from frontend using axios in react

    }

    let getAllEnquiry = () => {
        axios.get('http://localhost:8020/api/website/enquiry/view').then((response) => {
            return response.data;  // an object
        }).then((finalData) => {
            if(finalData.status === 1){
                setEnquiryList(finalData.enquiryList)
            }
        })
    }


    let getvalue = (event) => {
        let oldData = {...formData}  // that means jo bhi formdata me pada hai vo oldData me aajaye
        let inputName = event.target.name  // name
        console.log(inputName)   // name
        let inputValue = event.target.value  // name's value
        console.log(inputValue)

        oldData[inputName] = inputValue;
        setFormData(oldData)
    }

    useEffect(() => {
        getAllEnquiry()
    } , [])



    return (
        <div>
            <ToastContainer />
            <h1 className='text-[40px] text-center py-6 font-bold' >User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto] gap-[40px]' >
                <div className='bg-gray-200 p-4 ' >
                    <h2 className='text-[20px] font-bold' >Enquiry Form</h2>
                    <form action="" onSubmit={saveEnquiry} >
                        <div className='py-3'>
                            <Label htmlFor="name">Your Name</Label>
                            <TextInput type="text" name="name" onChange={getvalue} value={formData.name} placeholder="Enter your name" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="email">Your Email</Label>
                            <TextInput type="email" name='email' onChange={getvalue} value={formData.email} placeholder="Enter your Email" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="phone">Your phone no</Label>
                            <TextInput type="phone" name='phone' onChange={getvalue} value={formData.phone} placeholder="Enter your phone no" required />
                        </div>
                        <div className='py-3'>
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea name='message' onChange={getvalue} value={formData.message} placeholder="Enter your message" required rows={4} />
                        </div>
                        <div className='py-3' >
                            <Button type="submit" color="blue" className='w-[100%]' >{formData._id ? 'Update' : 'Save'}

                            </Button>
                        </div>

                    </form>
                </div>

                <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry}  Swal={Swal}  setEnquiryList={setEnquiryList} setFormData={setFormData} />



            </div>
        </div>
    )
}