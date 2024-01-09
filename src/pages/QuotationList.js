import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getQuotationList, deleteQuotationList, editQuotationList } from '../services/Api';


const QuotationList = () => {
    const [quotationList, setQuotationList,editQuotationList] = useState([]);


    useEffect(() => {
        showQuotationDataList();
    }, [])

    const showQuotationDataList = () => {
        getQuotationList().then((data) => {
            setQuotationList(data)
        });
    }
    const deleteQuotationListData = (item)=>{
        deleteQuotationList(item).then((data)=>{
            if(data.result){
            alert("Quotationlist Deleted Sucessfully");
            showQuotationDataList();
            }else{
                alert(data.message)
            }
        })
    }
    // const editQuotationListData =(id)=>{
    //     editQuotationList(id).then((data)=>{
    //       if(data.result){
        
    //       }
    //       else{
    //         alert(data.message)
    //       }
    
    //     })
    //   }

   
    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card'>
                        <div className='card-header bg-primary text-white text-center border-dark'>
                            <strong>Wedding Packagesdata List</strong>
                        </div>
                       <div className='card-body'>
                       <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Event Date</th>
                                    <th>Total Amount</th>
                                    <th>Advance Amount</th>
                                    <th>Primary Contact</th>
                                    <th>Customer Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    quotationList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.packageName}</td>
                                            <td>{item.eventDate}</td>
                                            <td>{item.totalAmount}</td>
                                            <td>{item.advanceAmount}</td>
                                            <td>{item.pContact}</td>
                                            <td>{item.customerName}</td>
                                            <td>
                                               <button  className='btn btn-sm btn-success' >Edit</button>
                                            </td>
                                            <td>
                                                <button className='btn btn-sm btn-danger' onClick={()=>deleteQuotationListData(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                       </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationList;