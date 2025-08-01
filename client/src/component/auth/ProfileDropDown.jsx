import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services/operations/authAPI"

export default function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-x-1"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src={user?.image || "/default-avatar.png"}
          alt={`profile-${user?.firstName || "user"}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </button>

      {open && (
        <div
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 min-w-[180px]"
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-x-2 py-2 px-4 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-2 py-2 px-4 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

