import { Component, createEffect, createSignal, For, onMount } from "solid-js"
import { DEFAULT_ITEMS, Item } from "../components/smart_env/items"
import { DEFAULT_LOCATIONS, Location } from "../components/smart_env/locations"

export const [locations, setLocations] = createSignal(DEFAULT_LOCATIONS)
export const [items, setItems] = createSignal(DEFAULT_ITEMS)

export const [current_location, setCurrentLocation] = createSignal(locations()[0])

const [viewWidth, setViewWidth] = createSignal()
const [viewHeight, setViewHeight] = createSignal()

createEffect(async () => {
/**
 * fetch data from smart env api to change when locations change.
 */
const res = await fetch('')
setLocations(await res.json())
})
    
createEffect(() => {
    /**
     * Side-effect when current location changes.
     */
     calcLocationSize(current_location())
})

function calcLocationSize(location: Location) {
    /**
     * Calculate location size to fit into LocationView.
     * @returns width and height in em of view
     * Either width or height should be 100% of the view and the other <=100% accordingly
     * height is intended to fill the view (25em) apart from width equally scaled is above 100%
     * In this case width is set to 70em (which replicates 100% of the view) and height scaled accordingly
     */
    let max_view_width: number = 70
    let max_view_height: number = 25

    let scale_factor = max_view_height / location.height
    let view_width = location.width * scale_factor
    let view_height = max_view_height
    if (view_width > max_view_width) {
        scale_factor = max_view_width / location.width
        view_width = max_view_width
        view_height = location.height * scale_factor
    }

    setViewWidth(view_width)
    setViewHeight(view_height)
}

export const LocationView: Component = () => {
    /**
     * View of location which is displayed in center.
     * Changed by LocationMenu by switching location via LocationCard
     */
    return (
        <div id="locationView" class="z-0 relative container text-center m-auto overflow-hidden outline-dashed">
            <h2 class="text-3xl py-5">{ current_location().name }</h2>
            <div id="locationDisplay" class="outline-dashed mx-auto" 
            style={{'width': `${ viewWidth() }em`, 'height': `${ viewHeight() }em`}}>
                <p>Location Image</p>
                <For each={ current_location().items }>
                    { (item: [Item, number]) => <p>{ item[0].name }</p>}
                </For>
            </div>
        </div>
    )
}