
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getServiceDataList, getWeddingPackagesList, addAllWeddingQuotation,editQuotationList } from '../services/Api';

const WeddingQuatation = (props) => {
  const [quotationObj, setQuotationObj] = useState({
    "lastUpdatedBy": props.obj.lastUpdatedBy,
    "weddingId": props.obj.weddingId,
    "customerId": props.obj.customerId,
    "customerName":props.obj.customerName,
    "eventDate": props.obj.eventDate,
    "arrivalTime":props.obj.arrivalTime,
    "relieveTime":props.obj.relieveTime,
    "totalAmount": props.obj.totalAmount,
    "advanceAmount":props.obj.advanceAmount,
    "details": props.obj.details,
    "isDeleted": props.obj.isDeleted,
    "pContact": props.obj.pContact,
    "sContact": props.obj.sContact,
    "message": "",
    "bookingUId": "",
    "userId": 0,
    "result": true,
    "isConfermed": "",
    "confirmDate": "",
    "reason": "",
    "venue": props.obj.venue,
    "sgst": props.obj.sgst,
    "cgst": props.obj.cgst,
    "discount": 0,
    "isAlacarte": props.obj.isAlacarte,
    "weddingPackageId": props.obj.weddingPackageId,
    "weddingDetails": [

    ],
    "extraWeddingDetails": [
      {
        "detailId": 0,
        "serviceId": 0,
        "noOfPax": 0,
        "rate": 0,
        "total": 0,
        "weddingId": 0,
        "requirment": "string"
      }
    ]
  })

  let [serviceData, setServiceData] = useState({
    "serviceId": '',
    "rate": '',
    "noOfPax": '',
    "requirment": '',
    "total": '',
    "name": ''
  })

  let [serviceDataList, setServiceDataList] = useState([])
  let [menuCartChecked, setMenuCartChecked] = useState();
  let [isChecked, setIsChecked] = useState(false);
  let [weddingPackageslist, setWeddingPackagesList] = useState([]);


  useEffect(() => {
    showServiceDataList();
    showWeddingPackages();
  }, [])

  const UpdateServiceForm = (event, key) => {
    setServiceData(prevObj => ({ ...prevObj, [key]: event.target.value }))
  }
  const handleInputChange = (event, key) => {
    setQuotationObj(prevobj => ({ ...prevobj, [key]: event.target.value }))
  }
  const handleCheckboxChange = (event) => {
    setMenuCartChecked(event.target.checked);
  };
  const handleCheckedChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const addServiceData = () => {

    let serviceObj = {
      "serviceId": '',
      "rate": '',
      "noOfPax": '',
      "requirment": '',
      "total": '',
      "name": ''
    }
    serviceObj = serviceData;
    const serviceDetaisl = serviceDataList.find(m => m.serviceId == serviceData.serviceId);
    if (serviceDetaisl != undefined) {
      serviceObj.name = serviceDetaisl.name;
    };


    setQuotationObj(prevObj => ({ ...prevObj, weddingDetails: [...prevObj.weddingDetails, serviceObj] }))
  }

  const showServiceDataList = () => {
    getServiceDataList().then((data) => {
      setServiceDataList(data)
    });
  }
  const showWeddingPackages = () => {
    getWeddingPackagesList().then((data) => {
      setWeddingPackagesList(data)

    })
  }

  const addWeddingQuotationData = () => {
    addAllWeddingQuotation(quotationObj).then((data) => {
      if (data.result) {
        alert("QuotationList Added Sucessfully ");

      }
      else {
        alert(data.message)
      }

    })

  }
  // const editQuotationListData =(id)=>{
  //   editQuotationList(id).then((data)=>{
  //     if(data.result){
  //       setQuotationObj(data);
  //     }
  //     else{
  //       alert(data.message)
  //     }

  //   })
  // }



  return (
    <div>
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-6'>
            <div className='card'>
              <div className='card-header bg-primary text-white text-center border-dark'>
                <strong>WEDDING QUOTATION</strong>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-4'>
                    <label>Customer Name</label>
                    <input type='text' value={quotationObj.customerName} onChange={(event) => handleInputChange(event, 'customerName')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>Primary contact:</label>
                    <input type='text' value={quotationObj.pContact} onChange={(event) => handleInputChange(event, 'pContact')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>Secondary Contact:</label>
                    <input type='text' value={quotationObj.sContact} onChange={(event) => handleInputChange(event, 'sContact')} className='form-control' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-4 pt-4'>
                    <div className="form-check">
                      <label className="form-check-label" > Is AL-Carte</label>
                      <input className="form-check-input" type="checkbox" checked={menuCartChecked} onChange={handleCheckboxChange} />
                    </div>
                  </div>
                  <div className='col-4'>
                    <label>Wedding Package</label>
                    <select className="form-select" value={quotationObj.weddingPackageId} aria-label="Default select example" onChange={(event) => handleInputChange(event, 'weddingPackageId')} >
                      <option>Select</option>
                      {
                        weddingPackageslist.map((item) => {
                          return (<option value={item.weddingPackageId}>{item.packageName}</option>)
                        })
                      }

                    </select>
                  </div>
                  <div className='col-4'>
                    <label>Event Date:</label>
                    <input type="date" value={quotationObj.eventDate} onChange={(event) => handleInputChange(event, 'eventDate')} className='form-control' />
                  </div>
                </div>
                <div className='row pt-3'>

                  <div className='col-4'>
                    <label>Arrival Time:</label>
                    <input type='time' value={quotationObj.arrivalTime} onChange={(event) => handleInputChange(event, 'arrivalTime')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>RelieveT ime:</label>
                    <input type='time' value={quotationObj.relieveTime} onChange={(event) => handleInputChange(event, 'relieveTime')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>Venue:</label>
                    <input type='text' value={quotationObj.venue} onChange={(event) => handleInputChange(event, 'venue')} className='form-control' />
                  </div>

                </div>

                <div className='row pt-3'>
                  <div className='col-4'>
                    <label>Total Amount:</label>
                    <input type='text' value={quotationObj.totalAmount} onChange={(event) => handleInputChange(event, 'totalAmount')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>Advance Amount:</label>
                    <input type='text' value={quotationObj.advanceAmount} onChange={(event) => handleInputChange(event, 'advanceAmount')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>SGST:</label>
                    <input type='text' value={quotationObj.sgst} onChange={(event) => handleInputChange(event, 'sgst')} className='form-control' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-4'>
                    <label>CGST:</label>
                    <input type='text' value={quotationObj.cgst} onChange={(event) => handleInputChange(event, 'cgst')} className='form-control' />
                  </div>
                  <div className='col-4'>
                    <label>Discount:</label>
                    <input type='text' value={quotationObj.discount} onChange={(event) => handleInputChange(event, 'discount')} className='form-control' />
                  </div>
                </div>
                <div className='row pt-3'>
                  <div className='col-6 pt-3'>
                    <div className="form-check">
                      <label className="form-check-label"> Is Confirmed</label>
                      <input className="form-check-input" type="checkbox" checked={isChecked} onChange={handleCheckedChange} />
                    </div>
                  </div>
                  <div className='col-4'>
                    <label className='align-item-start'>Confirm Date:</label>
                    <input type='date'value={quotationObj.confirmDate} onChange={(event) => handleInputChange(event, 'confirmDate')} className='form-control' />
                  </div>
                </div>
                <div className='Row'>
                  <div className='col-6'>
                    <label>Special Requirment</label>
                    <textarea className='form-control ' placeholder='Enter your requirement' />
                  </div>
                  <button className="btn btn-success" onClick={addWeddingQuotationData} >Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6'>
          {menuCartChecked && (
          <div className='col-12'>
            <div className='card'>
            <div className='bg-primary text-white text-center border-dark'>
              <h4> <strong>Service Data List</strong></h4> 
               </div>
              <div className='card-header '>
                <div className='row'>
                  <div className='col-6'>
                    <label>ServiceName</label>
                    <select className="form-select" aria-label="Default select example" onChange={(event) => { UpdateServiceForm(event, 'serviceId') }}>
                      <option>Select</option>
                      {
                        serviceDataList.map((item) => {
                          return (<option value={item.serviceId}>{item.name}</option>)
                        })
                      }
                    </select>
                  </div>
                  <div className='col-6'>
                    <label>Rate</label>
                    <input type='text' onChange={(event) => { UpdateServiceForm(event, 'rate') }} className='form-control' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label>No Of Pax</label>
                    <input type='text' onChange={(event) => { UpdateServiceForm(event, 'noOfPax') }} className='form-control' />
                  </div>
                  <div className='col-6'>
                    <label>Requirment</label>
                    <input type='text' onChange={(event) => { UpdateServiceForm(event, 'requirment') }} className='form-control' />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label>Total</label>
                    <input type='text' onChange={(event) => { UpdateServiceForm(event, 'total') }} className='form-control' />
                  </div>
                  <div className='col-6 pt-4'>
                    <button className="btn btn-primary" onClick={addServiceData}>Add</button>
                  </div>
                </div>
              </div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>serviceId</th>
                      <th>rate</th>
                      <th>No Of Pax</th>
                      <th>Requirement</th>
                      <th>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationObj.weddingDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.rate}</td>
                        <td>{item.noOfPax}</td>
                        <td>{item.requirment}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default WeddingQuatation;