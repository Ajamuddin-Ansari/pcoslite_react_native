import React,{useState} from 'react';
import { Modal, View, TouchableOpacity,Dimensions, StyleSheet ,ScrollView,Image} from 'react-native';
import { black, green, white } from '../../lib/colors';
import Swiper from 'react-native-swiper';
import Close from '../../assets/images/close.svg';
import Image_Url from './WsHelper/Image_Url';

const { width } = Dimensions.get('window');

const CustomModal = ({ visible, onClose, children, title }) => {
    const [itemdetail, setItemDetail] = useState({});
    const handleProductData = async (item) => {
        const id = await AsyncStorage.getData(AsyncStorageKeys.customer_id);
        const customerID = JSON.parse(id) || [];
           console.log("ddddasass",item.id);
        setShowProgress(true);
    
        let inputParams = {
          customer_id: customerID,
          id: item.id
        };
    
        UserAxios.getResponse(
          `${appStrings.screens.api_names.productDetail}`,
          inputParams,
          "post",
          (response, error) => {
    
            if (!error) {
              if (!response.error) {
                console.log("products............",response.similarProducts);
                setItemDetail(response.products);
                setSimilarProduct(response.similarProducts);
                setSimilarCategory(response.similarCategories);
    
              } else {
    
                console.log("Error", response.error);
              }
    
            }
            else {
    
              if (error.name != undefined && error.name != null)
                console.log(error.name);
            }
            setShowProgress(false);
          }
        );
      };
  return (
    <Modal
        visible={visible}
        transparent={true}
        onRequestClose={onClose}
        animationType="slide"
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          margin: 0,
          position: 'absolute',
          backgroundColor: white
        }}
      >

        <View style={styles.modalContainer}>

          <TouchableOpacity onPress={onClose}>
            <Close
              height={34}
              width={34}
              style={{ marginRight: "45%", bottom: 5 }} />

          </TouchableOpacity>

          <View style={styles.modalContent}>

            <ScrollView>
              <TouchableOpacity
                activeOpacity={1}>
                <View style={styles.image}>
                  <Swiper
                    style={{ height: width / 2 }}
                    autoplay={true}
                    loop={true}
                    scrollEnabled={true}
                    showsPagination={true}
                  >
                    {[itemdetail.image, itemdetail.image1, itemdetail.image2, itemdetail.image3, itemdetail.image4].map((image, index) => (
                      <TouchableOpacity key={index} onPress={() => openModal(index)}>
                        <Image
                          style={{ height: 180, width: 200, alignSelf: 'center' }}
                          resizeMode="contain"
                          source={{ uri: `${Image_Url}${image}` }}
                        />
                      </TouchableOpacity>
                    ))}
                  </Swiper>

                </View>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={isZoomModalVisible}
                onRequestClose={() => setZoomModalVisible(false)}
              >
                <ImageViewer
                  imageUrls={[
                    { url: `${Image_Url}${itemdetail.image}` },
                    { url: `${Image_Url}${itemdetail.image1}` },
                    { url: `${Image_Url}${itemdetail.image2}` },
                    { url: `${Image_Url}${itemdetail.image3}` },
                    { url: `${Image_Url}${itemdetail.image4}` }
                  ]}
                  index={selectedImageIndex}
                  enableSwipeDown={true}
                  onSwipeDown={() => setZoomModalVisible(false)}
                />
              </Modal>

              <CustomText style={{ color: black, fontSize: 18, fontWeight: "bold", margin: 10, left: 10 }}>{itemdetail.name}</CustomText>
              <CustomText style={{ marginHorizontal: 15, fontSize: 20, fontWeight: "700", top: 10 }}>Product Details</CustomText>
              <CustomText style={{ marginHorizontal: 15, fontSize: 16, fontWeight: "500", top: 10 }}>
                {itemdetail && itemdetail.description ? itemdetail.description.replace(/(<([^>]+)>)/ig, '') : ''}
              </CustomText>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                  <CustomText style={{ marginHorizontal: 15, fontSize: 20, fontWeight: "700" }}>Similar Product</CustomText>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      navigationRef.current?.navigate(appStrings.screens.appStrings.vegitables, { catdata: similarProduct, productTitle: "similarProduct" })
                      handleCloseModal();

                    }}>
                    <CustomText style={{ marginHorizontal: 20, fontSize: 16, fontWeight: "700", color: green, borderRadius: 2, borderWidth: 1, paddingHorizontal: 10, alignSelf: "center", borderColor: green }}>See All</CustomText>
                  </TouchableOpacity>
                </View>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={similarProduct}
                  renderItem={renderSimilarProductData}
                  keyExtractor={(item) => item.id}
                />
              </View>

              <View style={{ marginTop: "5%" }}>
                <View>
                  <CustomText style={{ marginHorizontal: 15, fontSize: 18, fontWeight: "700" }}>Similar Categories</CustomText>
                </View>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={similarCategory}
                  renderItem={CategoryItem}
                  keyExtractor={(item) => item.id}
                />
              </View>

             
              <View style={{ marginBottom: "20%" }}></View>
            </ScrollView>

            <View style={{ bottom: 0, position: "absolute", width: "100%", height: "8%", backgroundColor: white, elevation: 10, shadowColor: black, borderTopWidth: 0.5, borderTopColor: grey_border }}>

              <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <CustomText style={{ color: black, fontSize: 18, fontWeight: "bold", margin: 10 }}>₹{itemdetail.sale_price}</CustomText>
                <CustomText style={{ color: black, fontSize: 18, fontWeight: "bold", margin: 10 }}>MRP  ₹{itemdetail.discount_price}</CustomText>

                <CustomButton
                  title={buttonText}
                  buttonStyle={styles.buttonStyle}
                  titleStyle={{ alignSelf: "center", fontSize: 16 }}
                  onPress={() => {
                    if (buttonText === "Add To Cart") {
                      addToCartApi(itemdetail);
                    } else {
                      navigationRef.current?.navigate(appStrings.screens.appStrings.my_basket)
                      handleCloseModal();
                    }
                  }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ;
