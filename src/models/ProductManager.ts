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

  public Product?: Product; 
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

ProductEntry.belongsTo(Product, { foreignKey: 'productId' });

class ProductExit extends Model {
  public id!: number;
  public productId!: number; 
  public quantity!: number;
  public price!: number; 
  public batch!: string; 
  public date!: Date;

  public Product?: Product; 
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

ProductExit.belongsTo(Product, { foreignKey: 'productId' });

export { ProductEntry, ProductExit };
