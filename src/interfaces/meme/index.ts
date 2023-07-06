import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MemeInterface {
  id?: string;
  title: string;
  image: string;
  upvotes?: number;
  downvotes?: number;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface MemeGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  image?: string;
  user_id?: string;
  organization_id?: string;
}
