<template>
  <div class="address-edit-box">
    <!-- 顶部标题栏根据type的值变化 -->
    <s-header :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"></s-header>
    <!-- 使用vant的AddressEdit组件，注意各个属性的作用 -->
    <Van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader.vue";
//从封装的address.js中按需引入新增地、编辑地址、删除地址、获取地址详情等接口
import {
  addAddress,
  editAddress,
  deleteAddress,
  getAddressDetail,
} from "../../service/address";
//引入通用js，包含了全国省时区数据和级别的获取函数
import { tdist } from "@/common/js/utils";
export default {
  components: {
    sHeader,
  },
  data() {
    return {
      areaList: {
        province_list: {},
        city_list: {},
        country_list: {},
      },
      searchResult: [],
      type: "add",
      addressId: "",
      addressInfo: {},
      from: "",
    };
  },
  async mounted() {
    //省市区列表构造
    let _province_list = {};
    let _city_list = {};
    let _country_list = {};
    tdist.getLev1().forEach((p) => {
      _province_list[p.id] = p.text;
      tdist.getLev2(p.id).forEach((c) => {
        _city_list[c.id] = c.text;
        tdist.getLev3(c.id).forEach((q) => {
          _city_list[q.id] = q.text;
        });
      });
    });
    this.areaList.province_list = _province_list;
    this.areaList.city_list = _city_list;
    this.areaList.country_list = _country_list;

    //从路由参数中结构出addressId、type、from的值，理解它们的作用
    const { addressId, type, from } = this.$route.query;
    this.addressId = addressId;
    this.type = type;
    this.from = from || "";
    //编辑地址
    if (type == "edit") {
      //先请求地址详情，并返回结果中的dat结构出来，赋值给addressDetail变量
      const { data: addressDetail } = await getAddressDetail(addressId);
      let _areaCode = "";
      //获得一级地址
      const province = tdist.getLev1();
      Object.entries(this.areaList.country_list).forEach(([id, text]) => {
        if (text == addressDetail.regionName) {
          //找到区对应的几个省份
          const provinceIndex = province.findIndex(
            (item) => item.id.substr(0, 2) == id.substr(0, 2)
          );
          //找到区对应的几个市区
          //this.areaList.city_list
          const cityItem = Object.entries(this, ).filter(
            ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
          )[0];
          //对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
          if (
            province[provinceIndex].text == addressDetail.provinceName &&
            cityItem[1] == addressDetail.cityName
          ) {
            _areaCode = id;
          }
        }
      });
      //构建地址详情数据，给页面展示
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        city: addressDetail.cityName,
        country: addressDetail.regionName,
        addressDetail: addressDetail.detailAddress,
        areaCode: _areaCode,
        isDefault: !!addressDetail.defaultFlag,
      };
    }
  },

  methods: {
    //保存地址
    async onSave(content) {
      //构造请求参数
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.country,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      };
      if (this.type == "edit") {
        params["addressId"] = this.addressId;
      }
      //根据type的值，调用新增地址或修改地址接口
      (await this.type) == "add" ? addAddress(params) : editAddress(params);
      Toast("保存成功");
      setTimeout(() => {
        this.$router.push({ path: `address?from=${this.from}` });
      }, 1000);
    },
    //删除地址
    async onDelete() {
      //调用删除地址接口
      const res = await deleteAddress(this.addressId);
      if (res.message === "SUCCESS") {
        Toast("删除成功");
      } else {
        Toast("删除失败");
      }
      setTimeout(() => {
        this.$router.push({ path: "address" });
      }, 1000);
    },
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }
    .van-switch--on {
      background: @primary;
    }
  }
}
</style>