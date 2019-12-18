 
import { Module, VuexModule, MutationAction, getModule } from 'vuex-module-decorators';
import axios from 'axios';
import store from '../index';
import {ISiteItem} from '../../types/siteItem';

@Module({ name: 'sites', namespaced: true, dynamic: true, store })
export default class SiteModule extends VuexModule {
  public sites: ISiteItem[] = [];

  @MutationAction({ mutate: ['sites'] })
  public async fetchSites() {
    const { data } = await axios.get('/admin/sites');
    console.log(data.sites)
    return ({ sites: data.sites });
  }
}