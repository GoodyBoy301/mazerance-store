const isOpen = ref(false);
const term = ref("");

export default function useSearch() {
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }

  return { isOpen, open, close, term };
}
