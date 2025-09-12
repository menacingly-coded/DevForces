import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './database';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  fullName?: string;
  rating: number;
  maxRating: number;
  solvedProblems: number;
  role: 'user' | 'admin';
  avatarUrl?: string;
  country?: string;
  organization?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'rating' | 'maxRating' | 'solvedProblems' | 'role' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public passwordHash!: string;
  public fullName?: string;
  public rating!: number;
  public maxRating!: number;
  public solvedProblems!: number;
  public role!: 'user' | 'admin';
  public avatarUrl?: string;
  public country?: string;
  public organization?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password_hash',
  },
  fullName: {
    type: DataTypes.STRING(255),
    field: 'full_name',
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 1500,
  },
  maxRating: {
    type: DataTypes.INTEGER,
    defaultValue: 1500,
    field: 'max_rating',
  },
  solvedProblems: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'solved_problems',
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    field: 'avatar_url',
  },
  country: {
    type: DataTypes.STRING(2),
  },
  organization: {
    type: DataTypes.STRING(255),
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
});

export default User;