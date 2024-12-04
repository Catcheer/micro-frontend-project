import useMenu from '@/hooks/useMenu.js'
export default function Menu() {
    const { menuList } = useMenu()
console.log(menuList)

  return (
    <div>
      <div>Menu</div>
    </div>
  );
}