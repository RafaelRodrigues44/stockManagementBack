import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';

class ProductEntry extends Model {
  public id!: number;
  public productId!: number; 
  public quantity!: number;
  public price!: number; 
  public batch!: string; 
  public date!: Date;
}

ProductEntry.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize,
    modelName: 'ProductEntry',
    tableName: 'product_entries',
  }
);

class ProductExit extends Model {
  public id!: number;
  public productId!: number; 
  public quantity!: number;
  public price!: number; 
  public batch!: string; 
  public date!: Date;
}

ProductExit.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize,
    modelName: 'ProductExit',
    tableName: 'product_exits',
  }
);

export { ProductEntry, ProductExit };
