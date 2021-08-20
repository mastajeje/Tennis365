import {
  deleteItem,
  // getAllItems,
  insertItem,
  insertItemImgs,
  updateItemInfo,
} from "../queries/adminQuery.js";
import { getAllProducts } from "../queries/productQuery.js";
import { getAlluserInfo } from "../queries/userQuery.js";

export const postItem = async (req, res) => {
  const itemInfo = JSON.parse(req.body.itemInfo);
  const imgFiles = req.files;
  console.log(req.files);
  console.log(itemInfo);
  try {
    if (itemInfo) {
      const insertedItem = await insertItem(itemInfo, imgFiles[0]);
      console.log(insertedItem.insertId);
      await imgFiles.forEach((img) => {
        insertItemImgs(img, insertedItem);
      });
      const allItems = await getAllProducts();
      res.json(allItems);
    }
  } catch (err) {
    console.log(err);
  }
  // res.send({img:req.files[0].path})
};

// export const getItemList = async (req, res) => {
//   try {
//     const allItems = await getAllItems();
//     res.json(allItems);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updateItem = async (req, res) => {
  const editImg = req.file;
  const editInfo = JSON.parse(req.body.editInfo);
  const itemId = req.body.itemId;
  console.log(editImg, editInfo, req.body.itemId);
  try {
    await updateItemInfo(itemId, editInfo, editImg);
    const allItems = await getAllProducts();
    res.send({ allItems, success: "수정되었습니다" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAdminItem = async (req, res) => {
  const { targetId } = req.body;
  try {
    await deleteItem(targetId);
    console.log("item deleted");
    res.send({ success: "삭제되었습니다" });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await getAlluserInfo();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};
