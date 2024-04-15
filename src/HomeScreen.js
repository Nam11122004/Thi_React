import {
  FlatList,
  Image,
  SafeAreaView,
  Alert,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  ToastAndroid,
  Pressable,

} from "react-native";
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoApi, updateTodoApi, fetchTodos, addTodoAPI } from '../redux/todoAction';
import Banner from './banner';
import TextInputCustoms from './textinput';
import { launchImageLibrary, ImagePickerResponse, OptionsCommon } from 'react-native-image-picker';


import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';


import { decreaseQuantity, getProduct, increaseQuantity } from "../redux/todoReducer";


const commonOptions = {
  mediaType: 'photo',
  maxWidth: 500,
  maxHeight: 500,
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tenNhaHang, setTenNhaHang] = useState('');
  const [moTa, setMoTa] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [ngayNhap, setNgayNhap] = useState('');
  const [giaTien, setGiaTien] = useState('');


  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedNhaHang, setSelectedNhaHang] = useState(null);





  const openDetailModal = (item) => {
    setSelectedNhaHang(item);
    setDetailModalVisible(true);
  };


  const initialOffset = 10;

  const [id, setId] = useState('')
  const [update, setUpdate] = useState(false)
  const listTodo = useSelector(state => state.todos.listTodo);
  const dispatch = useDispatch();
  const opacity = useSharedValue(0);


  const scale = useSharedValue(1);
  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(withSpring(-offset.value), -1, true);
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.7);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyleButton = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 5000 });
  }, []);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacity.value,
  //   };
  // });

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])



  const onSelectImage = async () => {
    try {
      const response = await launchImageLibrary(commonOptions);
      if (response && response.assets) {
        setHinhAnh(response.assets[0].uri);
      } else {
        Alert.alert('Có lỗi xảy ra', response.errorMessage);
      }
    } catch (error) {
      console.error('Lỗi khi chọn ảnh từ thư viện:', error);
    }
  };

  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      {/*<Banner uri={"https://cdnphoto.dantri.com.vn/qo3j-IF23gkiKvWjQdBOlI7u_Hs=/zoom/1200_630/2020/11/10/fpt-polytechnic-10-nam-v-2-1-docx-1604981173950.png"} />*/}
      <View style={{ flex: 1, padding: 10 }}>
        {/* <Animated.Text style={[{fontWeight: 'bold', fontSize: 30, marginBottom: 10, color: '#ffffff'}, animatedStyle]}>
          Danh sách nhà hàng
        </Animated.Text> */}

        <FlatList data={listTodo} keyExtractor={(item) => item.id} renderItem={({ item }) => {
          return <View style={{ width: '100%', padding: 10, height: 120, marginBottom: 10, flexDirection: 'row', backgroundColor: '#faad', borderRadius: 10 }}>
            <View style={{ flex: 2, justifyContent: 'center', marginLeft: 10 }}>

              <TouchableOpacity onPress={() => openDetailModal(item)}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                  Tên nhà hàng: {item.ten_nha_hang_ph38422}
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }} >
                  Mô tả: {item.mo_ta_ph38422}
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                  Ngày nhập: {item.ngay_nhap_ph38422}
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                  Giá tiền: {item.gia_tien_ph38422}
                </Text>
              </TouchableOpacity>


            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa bản ghi này không ?', [
                  {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Xóa', onPress: () => {
                      dispatch(deleteTodoApi(item.id))
                        .then((result) => {
                          ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
                        })
                        .catch((error) => {
                          console.error('Error deleting todo:', error);
                        });
                    }
                  },
                ]);
              }}>
                <View style={[styles.button, { backgroundColor: 'red' }]}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setUpdate(true)
                setId(item.id)
                setTenNhaHang(item.ten_nha_hang_ph38422)
                setMoTa(item.mo_ta_ph38422)
                setHinhAnh(item.hinh_anh_ph38422)
                setNgayNhap(item.ngay_nhap_ph38422)
                setGiaTien(item.gia_tien_ph38422)

                setModalVisible(true)
              }}>
                <View style={[styles.button, { backgroundColor: 'blue' }]}>
                  <Text style={styles.buttonText}>Sửa</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }}>

        </FlatList>
        <TouchableOpacity
          onPress={() => {
            setUpdate(false)
            setId("")
            setTenNhaHang("")
            setMoTa("")
            setNgayNhap("")
            setGiaTien("")
            setModalVisible(true)
          }}
          style={{
            position: 'absolute',
            end: 40,
            bottom: 40,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>



        {/* Detail Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailModalVisible}
          onRequestClose={() => {
            setDetailModalVisible(false);
          }}
        >
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 350, height: 450, borderRadius: 20, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}>Chi tiết nhà hàng</Text>
              {selectedNhaHang && (
                <View>
                  <Text style={{ fontSize: 20, color: 'black' }}>Tên nhà hàng: {selectedNhaHang.ten_nha_hang_ph38422}</Text>
                  <Text style={{ fontSize: 18, color: 'black' }}>Mô tả: {selectedNhaHang.mo_ta_ph38422}</Text>
                  <Text style={{ fontSize: 18, color: 'black' }}>Ngày nhập: {selectedNhaHang.ngay_nhap_ph38422}</Text>
                  <Text style={{ fontSize: 18, color: 'black' }}>Giá tiền: {selectedNhaHang.gia_tien_ph38422}</Text>
                  <Image source={{ uri: selectedNhaHang.hinh_anh_ph38422 }} style={styles.image} />


                </View>
              )}
              <Button
                title="Đóng"
                onPress={() => setDetailModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 370, height: 700, borderRadius: 20, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}>
                {update ? "Sửa thông tin" : "Thêm nhà hàng"}
              </Text>

              <TextInputCustoms value={tenNhaHang} placeholder='Tên nhà hàng' onChangeText={(text) => setTenNhaHang(text)} />
              <TextInputCustoms value={moTa} placeholder='Mô tả' onChangeText={(text) => setMoTa(text)} />
              <TextInputCustoms value={ngayNhap} placeholder='ngày nhập' onChangeText={(text) => setNgayNhap(text)} />
              <TextInputCustoms value={giaTien} placeholder='giá tiền' onChangeText={(text) => setGiaTien(text)} />
              {/*<TextInputCustoms value={hinhAnh} placeholder='Hình anh' onChangeText={(text) => setHinhAnh(text)} />*/}

              <Button
                title="Chọn ảnh"
                onPress={onSelectImage}
              />
              {hinhAnh && <Image source={{ uri: hinhAnh }} style={styles.image} />}

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                <Button onPress={
                  () => {
                    setModalVisible(false)
                  }
                } title='Hủy' />
                <Button onPress={
                  () => {

                    if (!tenNhaHang || !moTa || !ngayNhap || !giaTien || !hinhAnh) {
                      Alert.alert("Vui lòng nhập đầy đủ thông tin");
                      return;
                    }
                    if (!update) {
                      const todoData = {
                        ten_nha_hang_ph38422: tenNhaHang,
                        mo_ta_ph38422: moTa,
                        hinh_anh_ph38422: hinhAnh,
                        ngay_nhap_ph38422: ngayNhap,
                        gia_tien_ph38422: giaTien,


                      };
                      dispatch(addTodoAPI(todoData)).then(() => {
                        ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
                        setModalVisible(false);
                      }).catch((error) => {
                        ToastAndroid.show("Thêm thất bại", ToastAndroid.SHORT);
                        console.log(error);
                      });
                    } else {
                      const formData = {
                        id: id,
                        data: {
                          ten_nha_hang_ph38422: tenNhaHang,
                          mo_ta_ph38422: moTa,
                          hinh_anh_ph38422: hinhAnh,
                          ngay_nhap_ph38422: ngayNhap,
                          gia_tien_ph38422: giaTien,
                        },
                      };
                      dispatch(updateTodoApi(formData)).then(() => {
                        ToastAndroid.show("Sửa thành công", ToastAndroid.SHORT);
                        setModalVisible(false);
                      }).catch((error) => {
                        ToastAndroid.show("Sửa thất bại", ToastAndroid.SHORT);
                        console.log(error);
                      });
                    }
                  }

                } title='Thêm' />
              </View>
            </View>
          </View>
        </Modal>



      </View>



    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  },
});
