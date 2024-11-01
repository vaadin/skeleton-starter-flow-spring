package org.vaadin.example;

import com.vaadin.flow.component.dnd.DragSource;
import com.vaadin.flow.component.dnd.DropEffect;
import com.vaadin.flow.component.dnd.DropTarget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("")
public class DragAndDropView extends HorizontalLayout {

    public DragAndDropView() {
        setMargin(true);
        setSizeFull();

        VerticalLayout boxA = createBox("Basket A");
        VerticalLayout boxB = createBox("Basket B");

        Image myImage = new Image("images/ball.jpeg", "My Image");
        makeDraggable(myImage);
        boxA.add(myImage);

        makeDroppable(boxA, boxB);
        makeDroppable(boxB, boxA);

        add(boxA, boxB);
    }

    private VerticalLayout createBox(String title) {
        VerticalLayout box = new VerticalLayout();
        box.add(new Div(new Div(title)));
        box.setWidth("300px");
        box.setHeight("300px");
        box.getStyle().set("border", "1px solid #ccc").set("padding", "10px");
        return box;
    }

    private void makeDraggable(Image button) {
        DragSource<Image> dragSource = DragSource.create(button);
        dragSource.setDraggable(true);
        dragSource.setDragImage(new Image("images/hand.png", "Drag&Drop"), 125, 125);
    }

    private void makeDroppable(VerticalLayout targetBox, VerticalLayout otherBox) {
        DropTarget<VerticalLayout> dropTarget = DropTarget.create(targetBox);
        dropTarget.setDropEffect(DropEffect.MOVE);

        dropTarget.addDropListener(event -> {
            event.getDragSourceComponent().ifPresent(draggedComponent -> {
                if (draggedComponent.getParent().isPresent()) {
                    ((VerticalLayout) draggedComponent.getParent().get()).remove(draggedComponent);
                }
                targetBox.add(draggedComponent);
            });
        });
    }
}
