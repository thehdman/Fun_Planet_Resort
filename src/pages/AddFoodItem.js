import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { SaveFoodItem, deleteFoodItem, getFoodItemList, getFoodItemTypes } from '../services/Api';

function AddFoodItem() {
  let [itemList, setItemList] = useState([]);
  let [isUpdate, setIsUpdate] = useState(false);
  let [isSave, setIsSave] = useState(true);
  let [loader, setLoader] = useState(true);
  let [itemTypes, setItemTypes] = useState([]);

  let [foodItem, setFoodItem] = useState({
    "ItemId": 0,
    "ItemName": "",
    "IsVeg": false,
    "FullPrice": 0,
    "HalfPrice": 0,
    "IsAvailable": false,
    "IsHalf": false,
    "FoodItemTypeId": 0,
    "Message": "",
    "Result": true
  })

  const handelChange = (event, key) => {
    setFoodItem((prevItem) => ({ ...prevItem, [key]: event.target.value }))
  }

  const handleCheckbox = (event, key) => {
    setFoodItem((prevItem) => ({ ...prevItem, [key]: event.target.checked }))
  }

  useEffect(() => {
    ShowData();
  }, [])

  const ShowData = () => {
    getFoodItemTypeList();
    getFoodItems();
  }

  const getFoodItemTypeList = () => {
    getFoodItemTypes().then(res => {
      setItemTypes(res);
    }).catch(err => {
      toast.error(err.message);
    })
  }

  const getFoodItems = () => {
    getFoodItemList().then((res) => {
      setLoader(false);
      setItemList(res);
    }).catch(err => {
      toast.error(err.message);
    })
  }

  const handleDelete = (item) => {
    if (window.confirm("Are You Sure ?  Want to delete Item ?")) {
      deleteFoodItem(item).then(res => {
        getFoodItems();
        toast.success(res.message)
      }).catch(err => {
        toast.error(err.message);
      })
    } else { return }
  }

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setIsSave(false);
    toast.warning("please update Food Item : " + item.itemName)
    setFoodItem({
      "ItemId": item.itemId,
      "ItemName": item.itemName,
      "IsVeg": item.isVeg,
      "FullPrice": item.fullPrice,
      "HalfPrice": item.halfPrice,
      "IsAvailable": item.isAvailable,
      "IsHalf": item.isHalf,
      "FoodItemTypeId": item.foodItemTypeId,
      "Message": "",
      "Result": true
    })
  }

  const handleReset = () => {
    setIsUpdate(false);
    setIsSave(true)
    setFoodItem({
      "ItemId": 0,
      "ItemName": "",
      "IsVeg": false,
      "FullPrice": 0,
      "HalfPrice": 0,
      "IsAvailable": false,
      "IsHalf": false,
      "FoodItemTypeId": 0,
      "Message": "",
      "Result": true
    })
  }

  const handleSave = () => {
    if (foodItem.ItemName.length !== 0) {
      if (foodItem.FullPrice !== 0) {
        if (foodItem.FoodItemTypeId !== 0) {
          SaveFoodItem(foodItem).then(res => {
            getFoodItems();
            toast.success(res.message);
            handleReset();
          }).catch((err) => {
            toast.error(err.message);
          })
        } else {
          toast.error("Please Select Food Type")
        }
      } else {
        toast.error("Please Enter Food Price")
      }
    } else {
      toast.error("Please Enter Food Name")
    }
  }

  return (

    <Container fluid >
      <Row className='row'>
        <Col md={9}>
          <Card className='shadow mt-1'>
            <CardHeader className='bg-primary'>
              <strong className='text-white'>Food Menu</strong>
            </CardHeader>
            <CardBody>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Food Name</th>
                    <th>Food Type Name</th>
                    <th>Veg/NonVeg</th>
                    <th>Availability</th>
                    <th>Full price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {
                  loader && <tbody>
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
                {
                  !loader && <tbody>
                    {
                      itemList.map((item, index) => {
                        return <tr>
                          <th>{index + 1}</th>
                          <th>{item.itemName}</th>
                          <th>{item.foodItemName}</th>
                          {
                            item.isVeg && <th className='text-success'>Veg</th>
                          }
                          {
                            !item.isVeg && <th className='text-danger'>Non-Veg</th>
                          }
                          {
                            item.isAvailable && <th className='text-success'>Available</th>
                          }
                          {
                            !item.isAvailable && <th className='text-danger'>Not-Available</th>
                          }
                          <th>{item.fullPrice} Rs</th>
                          <th>
                            <Button onClick={() => handleUpdate(item)} outline color='warning'>Edit</Button>
                          </th>
                          <th>
                            <Button onClick={() => handleDelete(item)} outline color='danger'>Delete</Button>
                          </th>
                        </tr>
                      })
                    }
                  </tbody>
                }
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow mt-1">
            <CardHeader className="bg-primary">
              {
                isSave && <strong className='text-white'>Add Food Item</strong>
              }
              {
                isUpdate && <strong className='text-white'>Update Food Item</strong>
              }
            </CardHeader>
            <CardBody>
              <Form>
                <Row >
                  <Col>
                    <FormGroup>
                      <Label>Food Name</Label>
                      <Input placeholder='Enter Food Name here' id='itemName'
                        type="text"
                        value={foodItem.ItemName}
                        onChange={(event) => { handelChange(event, "ItemName") }}
                        valid={foodItem.ItemName !== "" ? true : false}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Full Price</Label>
                      <Input placeholder='Enter price here' id='fullPrice'
                        type="number"
                        value={foodItem.FullPrice}
                        onChange={(event) => { handelChange(event, "FullPrice") }}
                        valid={foodItem.FullPrice !== 0 ? true : false}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col>
                    <FormGroup>
                      <Label>Food Type</Label>
                      <Input
                        type='select'
                        id="foodType"
                        value={foodItem.FoodItemTypeId}
                        onChange={(event) => { handelChange(event, 'FoodItemTypeId') }}
                        valid={foodItem.FoodItemTypeId !== 0 ? true : false}
                      >
                        <option className='bg-info'>select type</option>
                        {
                          itemTypes.map(item => {
                            return <option value={item.foodItemTypeId}>{item.foodItemName}</option>
                          })
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FormGroup switch>
                      <Input type="switch" checked={foodItem.IsAvailable}
                        value={foodItem.IsAvailable}
                        onChange={(event) => { handleCheckbox(event, 'IsAvailable') }}
                        role="switch"
                        style={{ height: 20, width: 50 }} />
                      <Label>Is Food Available ?</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FormGroup switch>
                      <Label>Is Food veg ?</Label>
                      <Input type="switch" checked={foodItem.IsVeg}
                        value={foodItem.IsVeg}
                        onChange={(event) => { handleCheckbox(event, 'IsVeg') }}
                        role="switch"
                        style={{ height: 20, width: 50 }} />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter >
              <Row>
                <Col>
                  <Button outline color='secondary' onClick={handleReset}>Reset</Button>
                </Col>
                {
                  isSave && <Col>
                    <Button outline color='success' onClick={handleSave}>Save</Button>
                  </Col>
                }
                {
                  isUpdate && <Col>
                    <Button outline color='warning' onClick={handleSave}>Update</Button>
                  </Col>
                }
              </Row>
            </CardFooter>
          </Card>
        </Col>


      </Row>
    </Container>
  )
}

export default AddFoodItem
