import React from "react"
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export function EnquiryList (props) {
    let data = props.data
    let getAllEnquiry = props.getAllEnquiry
    let setFormData = props.setFormData
    let deleteRow = (id) => {

        Swal.fire({
            title: "Do you want to delete the data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8020/api/website/enquiry/delete/${id}`).then((response) => {
                console.log(response.data);
                toast.success('Enquiry Deleted successfully ')
                getAllEnquiry()
        })
                Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not Deleted", "", "info");
            }
        });
    }

    let editRow = (editId) => {
        axios.get(`http://localhost:8020/api/website/enquiry/edit/${editId}`).then((response) => {
            let data = response.data.enquiry
            console.log(data);
            setFormData(data)
        } )
    }
    return (
            <div className='bg-gray-200 p-4' >

        <h2 className='text-[20px] font-bold mb-4 ' >Enquiry List</h2>
        <div className="overflow-x-auto">  {/**we took this table div from flowbite-react*/ }
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Sr no</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>Message</TableHeadCell>
                        <TableHeadCell>
                            <span >Edit</span>
                        </TableHeadCell>
                        <TableHeadCell>
                            <span >Delete</span>
                        </TableHeadCell>                                    
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        data.length>=1 
                        ? data.map((Items , index) => {
                            return (
                            <tr key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{Items.name}</TableCell>
                                <TableCell>{Items.email}</TableCell>
                                <TableCell>{Items.phone}</TableCell>
                                <TableCell>{Items.message}</TableCell>

                                <TableCell>
                                    <button onClick={() => deleteRow(Items._id)}  className="bg-red-500 text-white px-4 py-1 rounded-md"  >
                                        Delete
                                    </button>
                                </TableCell>

                                <TableCell>
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md" onClick={() => {editRow(Items._id)}} >
                                        Edit
                                    </button>
                                </TableCell>

                            </tr>
                            )
                        })
                        :
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell colSpan={7} className="text-center" >No Data Found</TableCell>
                        </TableRow>
                    }

                </TableBody>
            </Table>
        </div>
    </div>
    )
}

