import { reactive, readonly } from 'vue';

const state = reactive({
  versionData: null,
  isLoading: false,
  error: null,
});

let fetchPromise = null;

export function useVersionStore() {
  const fetchVersionData = async () => {
    // 如果已有数据，直接返回
    if (state.versionData) {
      return state.versionData;
    }

    // 如果正在请求中，返回现有的 promise
    if (fetchPromise) {
      return fetchPromise;
    }

    state.isLoading = true;
    state.error = null;

    fetchPromise = fetch(
      'https://raw.githubusercontent.com/hxabcd/0xabcd-log/master/public/update/EasiAuto.json'
    )
      .then((response) => response.json())
      .then((data) => {
        state.versionData = data;
        return data;
      })
      .catch((error) => {
        state.error = error;
        throw error;
      })
      .finally(() => {
        state.isLoading = false;
        fetchPromise = null;
      });

    return fetchPromise;
  };

  return {
    state: readonly(state),
    fetchVersionData,
  };
}
