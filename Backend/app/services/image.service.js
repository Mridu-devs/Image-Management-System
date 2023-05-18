import { Op } from "sequelize";

import { Album } from "../models/index.js";

export const getAllImg = async (key) => {
  try {
    let images = await Album.findAll();

    if (key) {
      images = await Album.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${key}%`,
              },
            },
            {
              keyword: {
                [Op.like]: `%${key}%`,
              },
            },
          ],
        },
      });
    }

    return images;
  } catch (error) {
    console.log(error);
  }
};

export const getImg = async (name, default_name) => {
  try {
    const images = await Album.findOne({
      where: {
        name,
        default_name,
      },
    });
    return images;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImg = async (data) => {
  try {
    const images = await Album.create(data);
    return images;
  } catch (error) {
    console.log(error);
  }
};
