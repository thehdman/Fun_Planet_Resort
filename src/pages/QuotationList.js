import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getQuotationList, deleteQuotationList, editQuotationList } from '../services/Api';





const QuotationList = () => {
    let [quotationList, setQuotationList] = useState([]);
    let [isLoader, setIsLoader] = useState(true);



    useEffect(() => {
        showQuotationDataList();
    }, [])

    const showQuotationDataList = () => {
        getQuotationList().then((data) => {
            setQuotationList(data)
            setIsLoader(false);
        });
    }


    const deleteQuotationListData = (item) => {
        const isDelete = window.confirm('Are You Sure Want To Delete');
        if (isDelete) {
            deleteQuotationList(item).then((data) => {
                if (data.result) {
                    alert('Quotation Deleted');
                    showQuotationDataList();
                } else {
                    alert(data.message)
                }
            })
        }
    }
    const editQuotationListData = (id) => {
        editQuotationList(id).then((data) => {
            if (data.result) {
                //   setQuotationObj()
            }
            else {
                alert(data.message)
            }

        })
    }


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
                                    {
                                        isLoader && <tbody>
                                            <tr>
                                                <td colSpan={9} className='text-center'>
                                                    <div class="spinner-border text-muted"></div>
                                                    <div class="spinner-border text-primary"></div>
                                                    <div class="spinner-border text-success"></div>
                                                    <div class="spinner-border text-info"></div>
                                                    <div class="spinner-border text-warning"></div>
                                                    <div class="spinner-border text-danger"></div>
                                                    <div class="spinner-border text-secondary"></div>
                                                    <div class="spinner-border text-dark"></div>
                                                    <div class="spinner-border text-light"></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                    {!isLoader &&
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
                                                            <button className='btn btn-sm btn-success' onClick={() => editQuotationListData(item.weddingId)}>Edit</button>
                                                        </td>
                                                        <td>
                                                            <button className='btn btn-sm btn-danger' onClick={() => deleteQuotationListData(item)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    }
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